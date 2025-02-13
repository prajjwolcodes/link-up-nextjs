import React from 'react'
import PostSection from './components/PostSection'
import Posts from './components/Posts'
import TrendsSidebar from '@/components/TrendsSidebar'

const page = async () => {

  return (
    <div className="max-w-[90rem] ml-[19rem] flex gap-10 mx-auto p-4 space-y-4">
      <div className='flex flex-col'>
        <PostSection />
        <Posts />
      </div>
      <TrendsSidebar />
    </div>
  )
}

export default page