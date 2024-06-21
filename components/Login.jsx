"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import authService from '@/services/appwrite'

const Login = () => {

  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async (data) => {
    setError("")
    setLoading(true)
    try {
      const session = await authService.login(data)
      if (session) {
        const user = await authService.getCurrentUser()
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Invalid email or password")
      console.error(err)
      throw err
    }


  return (
    <div className='w-full h-full pt-5'>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className='form-control '
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

}
export default Login