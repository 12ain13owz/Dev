import { Request, Response } from "express";
import { createSessionInput } from "../schema/auth.schema";
import log from "../utils/logger";
import { findByEmail, findUserById } from "../service/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { verifyJwt } from "../utils/jwt";
import { get } from "lodash";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionInput>,
  res: Response
) {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    const message = "Invalid email or password";

    if (!user) return res.send(message);
    if (!user.verified) return res.send("Please verify your email");

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.send(message);

    // sign a access token
    const accessToken = signAccessToken(user);

    // sign a refresh token
    const refreshToken = await signRefreshToken({
      userId: user._id.toString(),
    });

    //send the token
    return res.send({
      accessToken,
      refreshToken,
    });

    res.send("create");
  } catch (error) {
    log.error(`createSessionHandler: ${error}`);
    return res.status(500).send(error);
  }
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = String(get(req, "headers.x-refresh"));
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) return res.status(401).send("Could not refresh access token");

  const session = await findSessionById(decoded.session);
  if (!session || !session.valid)
    return res.status(401).send("Could not refresh access token");

  const user = await findUserById(String(session.user));
  if (!user) return res.status(401).send("Could not refresh access token");

  const accessToken = signAccessToken(user);
  return res.send({ accessToken });
}
