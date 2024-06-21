import authService from '@/services/appwrite'
import React, { useState } from 'react'

const Register = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    try {
      const session = await authService.login(formData)
      if (session) {
        const user = await authService.getCurrentUser()
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError(err.message)
      console.error(err)
      throw err
    }
  }


  return (
    <div className='w-full h-full pt-5'>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={create}>
        <div>
            <label htmlFor="name" className="block text-gray-400">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Register</button>
        </form>
    </div>
  )
}

export default Register