import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
  index,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import log from "../utils/logger";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified",
];

@pre<User>("save", async function () {
  if (!this.isModified) return;

  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop({ default: false })
  verified: boolean;

  @prop()
  passwordResetCode: string | null;

  async validatePassword(this: DocumentType<User>, candidiatePassword: string) {
    try {
      return await argon2.verify(this.password, candidiatePassword);
    } catch (error) {
      log.error(error, "Could not validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
