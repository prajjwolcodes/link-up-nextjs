import React from 'react'
import PostSection from './components/PostSection'
import TrendsSidebar from '@/components/TrendsSidebar'
import ForyouFeed from './ForyouFeed'

const page = async () => {

  return (
    <div className="w-full max-w-[90rem] flex gap-10 mx-auto p-2 space-y-4">
      <div className='flex w-full flex-col'>
        <PostSection />
        <ForyouFeed />
      </div>
      <TrendsSidebar />
    </div>
  )
}

export default page