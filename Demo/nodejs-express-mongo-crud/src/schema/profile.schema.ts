import { object, string, TypeOf } from "zod";

const body = object({
  title: string({
    required_error: "Title is required",
  }),
  name: string({
    required_error: "Name is required",
  }),
  position: string({
    required_error: "Position is required",
  }),
});

const params = object({
  id: string({
    required_error: "Id is required",
  }),
});

export const findProfileById = object({
  params: params,
});

export const createProfileSchema = object({
  body: body,
});

export const updateProfileSchema = object({
  params: params,
  body: body,
});

export type FindProfileById = TypeOf<typeof findProfileById>["params"];
export type CreateProfileInput = TypeOf<typeof createProfileSchema>["body"];
export type UpdateProfileInput = TypeOf<typeof updateProfileSchema>;
