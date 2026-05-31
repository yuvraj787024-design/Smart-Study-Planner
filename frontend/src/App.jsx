import React from 'react'
import { Route , Routes, useNavigate} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Planner from './Pages/Planner'
import Uiplanner from './Pages/Uiplanner'

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Uiplanner />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/planner' element={<Planner />} />
      </Routes>
      
    </div>
  )
}

export default App