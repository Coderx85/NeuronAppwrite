"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import authService from '@/services/appwrite'
import useAuth from '@/context/useAuth' 

// import Link from 'next/link'

const RegisterPage = () => {
  const router = useRouter()

  const { authStatus } = useAuth();

  if (authStatus) {
    router.replace('/profile');
    return <></>;
  }

  const { register, handleSubmit } = useForm()
  
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  //   name: '',
  // })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const create = async (data) => {
    setError("")
    setLoading(true)
    try {
      const session = await authService.createAccount(data)
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
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Register</h1>
        {/* <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p> */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
        <div>
            <label htmlFor="name" className="block text-gray-400">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              // value={formData.name}
              {...register('name')}
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
              // value={formData.email}
              {...register('email')}
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
              // value={formData.password}
              {...register('password')}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Register</button>
        </form>
    </div>
    </div>
  )
}

export default RegisterPage