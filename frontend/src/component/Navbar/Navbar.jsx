import React from 'react'

const Navbar = () => {
  return (
   <div className="h-screen w-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white shadow-lg p-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
          <img src="/logo(3).png" alt="Snap2Map Logo" className="h-19 w-30  mr-2 rounded-full"
          
          /> 
       
        </h1>  

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Home Button */}
          <button className= "relative overflow-hidden px-5 py-2 rounded-lg text-white font-semibold bg-gray-700 group shadow-md hover:shadow-xl hover:scale-105 transition transform">
            <span className="absolute inset-0 bg-white opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none"></span>
          
            Home
          </button>
          {/* Explore Button */}
          <button className="relative overflow-hidden px-5 py-2 rounded-lg text-white font-semibold bg-gray-700 group shadow-md hover:shadow-xl hover:scale-105 transition transform">
            <span className="absolute inset-0 bg-white opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none"></span>
            Explore
          </button>

          {/* Profile / Signup Button */}
          <button className="relative overflow-hidden px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-400 to-blue-900 group shadow-md hover:shadow-xl hover:scale-105 transition transform flex items-center gap-2">
            <span className="absolute inset-0 bg-white opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none"></span>
           
            Signup
          </button>

          <button className="relative overflow-hidden px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-400 to-blue-900 group shadow-md hover:shadow-xl hover:scale-105 transition transform flex items-center gap-2">
            <span className="absolute inset-0 bg-white opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none"></span>
           
            login
          </button>
        </div>

        {/* Mobile Menu Icon */}
      
      </nav>
    </div>
  )
}

export default Navbar
