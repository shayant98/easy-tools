"use client";

import { SignIn } from "@clerk/clerk-react";
import Link from "next/link";
const Login = () => {
  <div className=""></div>;
  return (
    <div className="flex min-h-screen justify-center h-screen">
      <div className="w-2/5 flex items-center h-full justify-center">
        <SignIn signUpUrl="/register" />
      </div>
    </div>
  );
};

export default Login;
