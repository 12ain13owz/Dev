import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}

export const SessionMode = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});
