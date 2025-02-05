"use client";

import { login } from "./action";
import { useActionState } from "react";

export default function Page() {
  const initState = { message: "" };
  const [state, formAction] = useActionState(login, initState);

  return (
    <form action={formAction}>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="bg-black text-white p-2 rounded-md border border-white"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="bg-black text-white p-2 rounded-md border border-white"
        />
      </div>

      <div>Message: {state.message}</div>
      <div>Token: {state.token}</div>

      <button className="px-4 bg-purple-400" type="submit">
        Login
      </button>
    </form>
  );

  // return (
  //   <form>
  //     <div>
  //       <label>Name</label>
  //       <input type="text" name="name" />
  //     </div>
  //     <div>
  //       <label>Male</label>
  //       <input type="radio" name="gender" value="male" />
  //       <label>Female</label>
  //       <input type="radio" name="gender" value="female" />
  //     </div>
  //     <div>
  //       <label>Phone</label>
  //       <input type="tel" name="phone" />
  //     </div>
  //   </form>
  // );
}
