import React from "react";

const SignIn = () => {
  return (
    <div className="bg-gray-200 p-8 rounded-[32px] shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Log in
        </button>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200">
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;


