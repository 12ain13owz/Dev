import { Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schema/user.schema";
import { createUser, findByEmail, findUserById } from "../service/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import { nanoid } from "nanoid";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);
    await sendEmail({
      from: "test@example.com",
      to: user.email,
      subject: "Please variety your account",
      text: `verication code ${user.verificationCode}. ID: ${user._id}`,
    });

    return res.send("User successfully created");
  } catch (error: any) {
    log.error(`createUserHandler: ${error}`);

    if (error.code === 11000)
      return res.status(409).send("Account already exists");

    return res.status(500).send(error);
  }
}

export async function verifyserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  try {
    const user = await findUserById(id);

    if (!user) return res.send("Could not verify user");
    if (user.verified) res.send("User is already verified");

    if (user.verificationCode == verificationCode) {
      user.verified = true;
      await user.save();
      return res.send("User successfully verified");
    }

    return res.send("Could not verify user");
  } catch (error) {
    log.error(`verifyUserHndler: ${error}`);

    return res.status(500).send(error);
  }
}

export async function forgotPaswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  try {
    const message =
      "If a user with that email is registered you will recive a password reset email";
    const { email } = req.body;
    const user = await findByEmail(email);

    if (!user) {
      log.debug(`User with email ${email} does not exists`);
      return res.send(message);
    }
    if (!user.verified) return res.send("User is not verified");

    const passwordResetCode = nanoid();
    user.passwordResetCode = passwordResetCode;

    await user.save();
    await sendEmail({
      to: user.email,
      from: "test@example.com",
      subject: "Reset your password",
      text: `password reset code ${passwordResetCode}. ID: ${user._id}`,
    });

    log.debug(`Password reset email sent to ${email}`);
    return res.send(message);
  } catch (error) {
    log.error(`forgotPaswordHandler: ${error}`);
    return res.status(500).send(error);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  try {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;
    const user = await findUserById(id);

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    )
      return res.status(400).send("Could not reset user password");

    user.passwordResetCode = null;
    user.password = password;
    await user.save();

    return res.send("Successfully updated user password");
  } catch (error: any) {
    log.error(`resetPasswordHandler: ${error}`);
    return res.status(500).send(error);
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
