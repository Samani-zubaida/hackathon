import React from "react";

const Login = () => {
  return (
    <>
      <div className="relative w-full min-h-screen">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src="/bg-img.png"
          alt="Background"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg">
            this is the div
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
