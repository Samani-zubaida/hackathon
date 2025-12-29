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
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="flex space-x-4 bg-white bg-opacity-70 p-6 rounded-xl shadow-lg">
    
    <div className="bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg">
      Left Box
    </div>

    <div className="bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg">
      Right Box
    </div>

  </div>
</div>

        </div>
      </div>
    </>
  );
};

export default Login;
