import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const Login = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const planner = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const result = await res.json()

      console.log('Login Response:', result)

      const token = result.token || result.data?.token

      if (!res.ok) {
        alert(
          result.message ||
          'User not found or incorrect password'
        )
        return
      }

      if (!token) {
        alert('Login failed. No token received.')
        return
      }

      localStorage.setItem('token', token)

      alert('🎉 Login Successful!')

      navigate('/planner')
    } catch (error) {
      console.error('Login Error:', error)
      alert('Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Login
        </h2>

        <form onSubmit={planner} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          <div className="relative">

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                pr-12
                border
                border-gray-300
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-purple-500
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
            {loading ? 'Please wait...' : 'Login'}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  )
}

export default Login