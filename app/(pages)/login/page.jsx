"use client"
import React from 'react'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login'

const LoginPage = () => {
  const router = useRouter()

  const { authStatus } = useAuth();

  if (authStatus) {
    router.replace('/profile');
    return <></>;
  }

  return (
    // <Login />
    <div className='w-full h-full pt-5 justify-center mx-auto px-auto'>
      <Login />
    </div>
  )
}

export default LoginPage