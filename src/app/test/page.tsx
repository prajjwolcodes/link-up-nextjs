'use client'

import FollowList from "@/components/FollowList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Sample data - replace with your actual data structure
interface User {
    id: string
    avatarUrl?: string | null
    username: string
    displayName: string
    following: {
        followerId: string
        followingId: string
    }[] | null
}

export default function FeedTabs() {
    // Sample data - replace with your actual data fetching logic
    const [forYouUsers] = useState<User[]>([
        {
            id: "1",
            username: "johndoe",
            displayName: "John Doe",
            following: null
        },
        {
            id: "2",
            username: "janedoe",
            displayName: "Jane Doe",
            following: null
        }
    ])

    const [followingUsers] = useState<User[]>([
        {
            id: "3",
            username: "alicesmith",
            displayName: "Alice Smith",
            following: [{ followerId: "current-user", followingId: "3" }]
        },
        {
            id: "4",
            username: "bobwilson",
            displayName: "Bob Wilson",
            following: [{ followerId: "current-user", followingId: "4" }]
        }
    ])

    return (
        <Tabs defaultValue="for-you" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="for-you"
                    className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                >
                    For You
                </TabsTrigger>
                <TabsTrigger
                    value="following"
                    className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                >
                    Following
                </TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="mt-6">
                <FollowList
                    users={forYouUsers}
                    loggedInUserId="current-user"
                />
            </TabsContent>

            <TabsContent value="following" className="mt-6">
                <FollowList
                    users={followingUsers}
                    loggedInUserId="current-user"
                />
            </TabsContent>
        </Tabs>
    )
}