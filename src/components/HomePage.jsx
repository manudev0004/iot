import React from "react";
import SignIn from "./Signin";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - SignIn form */}
        <SignIn />

        {/* Right side - Banner */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Manage Your Cloud Resources with Ease
          </h1>
          <img
            src="resource.png"
            alt="Cloud Resources"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="mt-4 text-gray-700 text-center">
            Simplify your cloud infrastructure management. Sign up now and take
            control of your resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
