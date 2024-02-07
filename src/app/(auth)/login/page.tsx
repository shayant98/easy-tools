"use client";

import { SignIn } from "@clerk/clerk-react";
const Login = () => {
  <div className=""></div>;
  return (
    <div className="flex h-screen min-h-screen justify-center">
      <div className="flex h-full w-2/5 items-center justify-center">
        <SignIn signUpUrl="/register" />
      </div>
    </div>
  );
};

export default Login;
