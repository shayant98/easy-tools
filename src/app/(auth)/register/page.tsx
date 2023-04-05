import { SignUp } from "@clerk/clerk-react";
const Login = () => {
  <div className=""></div>;
  return (
    <div className="flex min-h-screen h-screen">
      <div className="w-2/5 flex items-center h-full justify-center bg-gray-500">
        <SignUp signInUrl="/login" />;
      </div>
      <div className="w-3/5 bg-gray-700"></div>
    </div>
  );
};

export default Login;
