"use client";

import { SignIn } from "@clerk/clerk-react";
import Link from "next/link";
const Login = () => {
  <div className=""></div>;
  return (
    <div className="flex min-h-screen h-screen">
      <div className="w-2/5 flex items-center h-full justify-center bg-gray-500">
        <SignIn signUpUrl="/register" />
      </div>
      <div className="w-3/5 bg-gray-700 flex justify-center items-center">
        <div className="w-full md:w-1/2 px-4">
          <div
            className="
               bg-slate-100
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-primary border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               mb-10
               "
          >
            <span className="text-primary font-semibold text-lg block mb-4">Why Create an account</span>
            <h2 className="font-bold text-dark mb-5 text-[42px]">
              $0
              <span className="text-base text-body-color font-medium">/ year</span>
            </h2>
            <p
              className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-slate-300
                  "
            >
              Perfect for personal projects
            </p>
            <div className="mb-7">
              <p className="text-base text-body-color leading-loose mb-1">Create & save snippets from existing tools</p>
              <p className="text-base text-body-color leading-loose mb-1">Coming soon...</p>
            </div>
            <Link href={"/register"}>
              <button
                className="
                  w-full
                  block
                  text-base
                  font-semibold
                  text-primary
                  bg-transparent
                  border border-[#D4DEFF]
                  rounded-md
                  text-center
                  p-4
                  hover:bg-gray-900 hover:text-white
                  transition
                  "
              >
                Choose Personal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
