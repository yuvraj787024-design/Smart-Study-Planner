import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">

      {/* Left Side */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700 cursor-pointer whitespace-nowrap">
       Smart Study Planner
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-5">

        <button
          onClick={() => navigate('/login')}
          className="
            px-4 sm:px-5 md:px-6
            py-2
            text-sm sm:text-base
            bg-purple-600
            text-white
            rounded-full
            hover:bg-purple-700
            transition-all
            duration-300
            whitespace-nowrap
          "
        >
          Login
        </button>

        <button
          onClick={() => navigate('/register')}
          className="
            px-4 sm:px-5 md:px-6
            py-2
            text-sm sm:text-base
            border-2
            border-purple-600
            text-purple-700
            rounded-full
            hover:bg-purple-600
            hover:text-white
            transition-all
            duration-300
            whitespace-nowrap
          "
        >
          Register
        </button>

      </div>

    </nav>
  )
}

export default Navbar