"use client";

import { login } from "./action";
import { useActionState } from "react";

export default function Page() {
  const initState = { message: null };
  const [state, formAction] = useActionState(login, initState);

  return (
    <form action={formAction} className="container p-4 flex flex-col gap-2">
      <div>
        Email:{" "}
        <input
          type="text"
          name="email"
          className="border border-teal-500 rounded-md"
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          name="password"
          className="border border-teal-500 rounded-md"
        />
      </div>

      <div>Message: {state?.message}</div>
      <div className="items-end">
        <button
          type="submit"
          className="rounded-md bg-purple-400 text-white p-2 flex"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
