import authService from '@/services/appwrite'
import React, { useState } from 'react'

const Login = () => {
  
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
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className='form-control '
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login