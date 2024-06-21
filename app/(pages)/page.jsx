"use client"
import React from 'react';
import useAuth from '@/context/useAuth';
import Link from 'next/link';

const HomePage = () => {
  const {authStatus} = useAuth();
  return (
    <div>
      <h1>Home Page</h1>
      {authStatus ? (
        <p>Welcome back!</p>
      ) : (
          <div>
            <Link href="/login">
              Hell User, Please Login to continue
            </Link>
          </div>
      )}
    </div>
  )
}

export default HomePage