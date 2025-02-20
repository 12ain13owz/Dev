"use server";

import axios from "axios";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const url = process.env.STRAPI_BASE_URL + "/api/auth/local";

    const respones = await axios.post(url, {
      identifier: email,
      password,
    });

    (await cookies()).set("token", respones.data.jwt);
  } catch (error) {
    console.log(error);
    return { message: error.message || "Error logging in" };
  }

  redirect("/special-blogs");
}
