import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Planner = () => {
  const navigate = useNavigate()

  const [examName, setExamName] = useState('')
  const [examDate, setExamDate] = useState('')
  const [studyHours, setStudyHours] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    alert('Logged Out Successfully')
    navigate('/')
  }

  const generatePlan = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }

    setLoading(true)

    const data = {
      examName,
      examDate,
      studyHours,
      subjects: subjectName
        .split(',')
        .map((s) => s.trim()),
    }

    try {
      const res = await fetch(
        'http://localhost:3000/api/auth/schedule',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      )

      let responseData

      try {
        responseData = await res.json()
      } catch (err) {
        alert('Server returned invalid response')
        return
      }

      console.log('PLAN RESPONSE:', responseData)

      if (res.status === 401) {
        alert('Unauthorized. Please login again.')

        localStorage.removeItem('token')
        navigate('/login')
        return
      }

      setResult(
        responseData.aiResponse ||
          responseData.message ||
          'No plan generated'
      )

    } catch (error) {
      console.error('Generate Plan Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md shadow-sm">

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700">
          Smart Study Planner
        </h1>

        <button
          onClick={logout}
          className="
            px-4 sm:px-5 md:px-6
            py-2
            bg-red-500
            text-white
            rounded-full
            hover:bg-red-600
            transition-all
            duration-300
          "
        >
          Logout
        </button>

      </nav>

      {/* Form */}
      <div className="flex justify-center items-center p-4 mt-8">

        <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
            Generate Study Plan
          </h2>

          <form onSubmit={generatePlan} className="space-y-5">

            <input
              type="text"
              placeholder="Exam Name"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="number"
              placeholder="Study Hours Per Day"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="text"
              placeholder="Subjects (Math, Physics, Chemistry)"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

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
              {loading
                ? 'Generating Plan...'
                : 'Generate Plan'}
            </button>

          </form>

          {result && (
            <div className="mt-8 p-5 bg-purple-50 border border-purple-200 rounded-2xl">

              <h3 className="text-xl font-semibold text-purple-700 mb-3">
                AI Generated Study Plan
              </h3>

              <pre className="whitespace-pre-wrap text-gray-700">
                {result}
              </pre>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Planner