import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { ErrorResponse } from "../models/error.mode";
import log from "../utils/logger";
import { signJwt } from "../utils/jwt";

export function signAccessToken(user: DocumentType<User>) {
  try {
    const payload = user.toJSON();
    const accessToken = signJwt(payload, "accessTokenPrivateKey");
    console.log("Payload:", payload);
    console.log(accessToken);

    return accessToken;
  } catch (error) {
    const e = error as ErrorResponse;
    log.error(`signAccessToken: ${e.message}`);
    return null;
  }
}

export async function signRefreshToken({ userId }: { userId: string }) {}
