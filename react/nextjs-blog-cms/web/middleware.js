import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const token = request.cookies.get("token");
    const url = process.env.STRAPI_BASE_URL + "/api/users/me";

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response.ok) throw new Error("Login failed");

    const responseJSON = await response.json();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify({ email: responseJSON.email }));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/special-blogs/:path*",
};
