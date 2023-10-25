import { Request, Response } from "express";
import log from "../utils/logger";
import { ErrorResponse } from "../models/error.mode";
import { CreateSessionInput } from "../schema/auth.sehema";
import { fidnUserByEmail } from "../services/user.service";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const user = await fidnUserByEmail(email);
    if (!user)
      throw {
        status: 400,
        message: `Invalid email or password`,
      };
    if (!user.verified)
      throw { status: 401, message: "Please verify your email" };

    const isValid = await user.validatePassword(password);
    if (!isValid) throw { status: 400, message: "Invalid email or password" };

    // sign a access token

    // sign a refresh token

    // send the tokens
  } catch (error) {
    const e = error as ErrorResponse;
    log.error(`createSessionHandler: ${e.message}`);

    if (e.status) return res.status(e.status).send(e.message);
    res.status(500).send(e.message);
  }
}
