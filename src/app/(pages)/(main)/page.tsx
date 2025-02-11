import React from 'react'
import PostSection from './components/PostSection'
import Posts from './components/Posts'

const page = async () => {

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <PostSection />
      <Posts />
    </div>
  )
}

export default page