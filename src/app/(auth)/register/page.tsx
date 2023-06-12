"use client";

import { SignUp } from "@clerk/clerk-react";
const Login = () => {
  <div className=""></div>;
  return (
    <div className="flex min-h-screen justify-center h-screen">
      <div className="w-2/5 flex items-center h-full justify-center ">
        <SignUp signInUrl="/login" redirectUrl={"/"} />;
      </div>
    </div>
  );
};

export default Login;
