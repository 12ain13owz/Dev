import { prop, getModelForClass } from "@typegoose/typegoose";

export class Profile {
  @prop()
  public title: string;

  @prop()
  public name: string;

  @prop()
  public position: string;
}

const ProfileModel = getModelForClass(Profile);
export default ProfileModel;
