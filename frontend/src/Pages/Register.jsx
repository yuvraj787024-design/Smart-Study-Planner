import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const planner = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const result = await res.json();

      console.log("Register Response:", result);

      if (!res.ok) {
        alert(
          result.message ||
            "Registration failed. User may already exist."
        );
        return;
      }

      alert(
        result.message ||
          "🎉 Registration Successful!"
      );

      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Section */}
        <div className="bg-linear-to-r from-purple-600 to-pink-600 h-32 flex justify-center items-center">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg flex justify-center items-center text-4xl">
            👤
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Join Smart Study Planner today
          </p>

          <form onSubmit={planner} className="space-y-5">

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                border-2
                border-purple-100
                rounded-xl
                focus:border-purple-500
                outline-none
                transition
              "
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                border-2
                border-purple-100
                rounded-xl
                focus:border-purple-500
                outline-none
                transition
              "
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full
                  px-4
                  py-3
                  pr-12
                  border-2
                  border-purple-100
                  rounded-xl
                  outline-none
                  focus:border-purple-500
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-purple-600
                  text-2xl
                "
              >
                {showPassword ? (
                  <MdVisibilityOff />
                ) : (
                  <MdVisibility />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3
                bg-linear-to-r
                from-purple-600
                to-pink-600
                text-white
                font-semibold
                rounded-xl
                shadow-lg
                hover:scale-105
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Please wait..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-700 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;