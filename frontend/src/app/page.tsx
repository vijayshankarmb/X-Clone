'use client';

import React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Feed } from '@/components/Feed'
import { RightSidebar } from '@/components/RightSidebar'

const Home = () => {
  return (
    <div className='flex justify-center min-h-screen bg-white text-black'>
      <div className='flex flex-col sm:flex-row w-full max-w-[1265px]'>
        <Sidebar />
        <main className='flex-1 border-r border-gray-100 max-w-[600px] w-full mx-auto'>
          <Feed />
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
