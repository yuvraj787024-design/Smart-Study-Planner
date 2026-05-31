import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Uiplanner = () => {
  //Button of login and Register
  const navigate = useNavigate()

  const loginbtn = () => {
    navigate('/login')
  }

  const register = () => {
    navigate('/register')
  }

  //Text For Introduction
  const [text, setText] = useState("");

  useEffect(() => {
    const message =
      "Hello, I am Jarvis. Welcome to the Smart Study Planner.";

    let i = 0;

    const timer = setInterval(() => {
      setText(message.slice(0, i + 1));
      i++;

      if (i === message.length) {
        clearInterval(timer);
      }
    }, 70);

     // Voice
  const speech = new SpeechSynthesisUtterance(message);

  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);

  return () => {
    clearInterval(timer);
    window.speechSynthesis.cancel();
  };

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">

        {/* Robot */}
        <motion.div
          animate={{
            rotate: [-2, 2, -2],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="relative flex flex-col items-center mt-32"
        >
          {/* Head */}
          <div className="w-32 md:w-40 h-24 md:h-32 bg-slate-800 rounded-3xl relative shadow-2xl">

            {/* Antenna */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-1 h-8 bg-slate-700"></div>
              <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>

            {/* Eyes */}
            <div className="flex justify-center gap-6 md:gap-8 pt-8 md:pt-10">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400"></div>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400"></div>
            </div>

            {/* Mouth */}
            <div className="w-12 md:w-16 h-2 bg-cyan-400 rounded-full mx-auto mt-4 md:mt-5"></div>
          </div>

          {/* Neck */}
          <div className="w-6 md:w-8 h-4 bg-slate-600"></div>

          {/* Body */}
          <div className="w-40 md:w-48 h-40 md:h-48 bg-slate-700 rounded-3xl relative shadow-2xl">

            {/* Reactor Glow */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <div className="absolute w-14 h-14 rounded-full bg-cyan-400 animate-ping"></div>
              <div className="relative w-14 h-14 rounded-full bg-cyan-400 shadow-xl shadow-cyan-400"></div>
            </div>

            {/* Buttons */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>

          {/* Left Arm */}
          <motion.div
            animate={{
              rotate: [-15, 15, -15],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute top-32 md:top-40 -left-10 md:-left-14 w-8 md:w-10 h-24 md:h-28 bg-slate-700 rounded-full origin-top"
          />

          {/* Right Arm */}
          <motion.div
            animate={{
              rotate: [15, -15, 15],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute top-32 md:top-40 -right-10 md:-right-14 w-8 md:w-10 h-24 md:h-28 bg-slate-700 rounded-full origin-top"
          />

          {/* Legs */}
          <div className="flex gap-8 md:gap-12 mt-1">
            <div className="w-6 md:w-8 h-20 md:h-24 bg-slate-700 rounded-full"></div>
            <div className="w-6 md:w-8 h-20 md:h-24 bg-slate-700 rounded-full"></div>
          </div>
        </motion.div>

        {/* Typing Text */}
        <h1 className="mt-12 text-center text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 max-w-4xl">
          {text}
          <span className="animate-pulse text-cyan-500">|</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-center text-gray-600 text-lg md:text-xl max-w-3xl">
          Your personal AI-powered assistant for smarter planning,
          better learning, and exam success.
        </p>

        {/* Button */}
        <button onClick={register}
          className="mt-8 px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          Get Started
        </button>

      </div>
    </div>
  );
};

export default Uiplanner;