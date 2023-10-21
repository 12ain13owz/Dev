import ProfileModel, { Profile } from "../model/profile.model";

export function findProfile() {
  return ProfileModel.find({});
}

export function findProfileById(id: string) {
  return ProfileModel.findById(id);
}

export function createProfile(input: Profile) {
  return ProfileModel.create(input);
}

export async function updateProfile(id: string, input: Profile) {
  return ProfileModel.findByIdAndUpdate(id, input);
}

export async function deleteProfile(id: string) {
  return ProfileModel.findOneAndDelete({ _id: id });
}
