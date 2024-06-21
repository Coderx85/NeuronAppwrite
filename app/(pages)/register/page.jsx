"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import authService from '@/services/appwrite'
import useAuth from '@/context/useAuth' 
import Register from '@/components/Register'

// import Link from 'next/link'

const RegisterPage = () => {
  const router = useRouter()

  const { authStatus } = useAuth();

  if (authStatus) {
    router.replace('/profile');
    return <></>;
  }
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const create = async (data) => {
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
    <Register />
  )
}

export default RegisterPage