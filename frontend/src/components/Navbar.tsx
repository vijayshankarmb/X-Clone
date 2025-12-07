'use client';

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className='p-4 border-b flex justify-between'>
        <Link href='/'>
      <h1 className='font-bold text-3xl'>X-Clone</h1>
        </Link>

      <div className='flex justify-center items-center gap-3'>
        {isAuthenticated ? (
          <>
            <span className='text-sm text-gray-600'>Welcome, {user?.userName}</span>
            <Button
              onClick={logout}
              className='cursor-pointer hover:bg-gray-800 hover:scale-105'
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Button className='cursor-pointer hover:bg-gray-800 hover:scale-105'>Login</Button>
            </Link>

            <Link href='/sign-up'>
              <Button className='cursor-pointer hover:bg-gray-800 hover:scale-105'>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
