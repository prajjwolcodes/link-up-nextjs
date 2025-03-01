import React from 'react'
import PostSection from './components/PostSection'
import TrendsSidebar from '@/components/TrendsSidebar'
import ForyouFeed from './ForyouFeed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FollowingFeed from './FollowingFeed'

const page = async () => {

  return (
    <div className="w-full max-w-[90rem] flex gap-10 mx-auto p-2 space-y-4">
      <div className='flex w-full flex-col '>
        <PostSection />
        <Tabs defaultValue="for-you" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="for-you" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              For You
            </TabsTrigger>
            <TabsTrigger value="following" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you" className="mt-2">
            <ForyouFeed />
          </TabsContent>

          <TabsContent value="following" className="mt-3">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </div>
  )
}

export default page