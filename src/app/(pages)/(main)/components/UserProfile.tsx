// UserProfile.jsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function UserProfile() {
    // Mock user data
    const user = {
        name: "Jane Smith",
        username: "@janesmith",
        email: "janesmith@gmail.com",
        followers: 1842,
        bio: "Designer, developer, and creator. Passionate about building products that make a difference.",
        following: 384,
        posts: [
            {
                id: 1,
                content: "Just launched my new portfolio website! Check it out and let me know what you think 🚀",
                likes: 124,
                comments: 32,
                date: "2h ago"
            },
            {
                id: 2,
                content: "Working on some new design concepts for an upcoming project. Can't wait to share more details soon!",
                likes: 89,
                comments: 14,
                date: "1d ago"
            },
            {
                id: 3,
                content: "Had an amazing time at the design conference yesterday. Met so many talented people and got inspired by their work.",
                likes: 215,
                comments: 27,
                date: "3d ago"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Cover Image */}
                <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"></div>

                {/* Profile Header */}
                <div className="bg-white p-6 shadow rounded-b-lg">
                    <div className="flex flex-col md:flex-row">
                        {/* Avatar - Positioned to overlap the cover image */}
                        <div className="relative -mt-16 mb-4 md:mb-0">
                            <Avatar className="h-48 w-48 border-4 border-white shadow-md">
                                <AvatarImage src="/api/placeholder/150/150" alt={user.name} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="md:ml-6 flex flex-col md:flex-row w-full justify-between">
                            {/* User Info */}
                            <div>
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-gray-500">{user.username}</p>
                                {/* <p className="text-gray-500 text-sm ml-1">{user.email}</p> */}
                                <p className="my-2">{user.bio}</p>
                            </div>

                            {/* Follow Button */}
                            <div className="mt-4 flex gap-2 md:mt-0">
                                <Button className="bg-blue-600 hover:bg-blue-700">Follow</Button>
                                <Button className="bg-gray-600 hover:bg-gray-700">Message</Button>

                            </div>
                        </div>
                    </div>

                    {/* Followers/Following Stats */}
                    <div className="flex gap-4 mt-10">
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{user.following.toLocaleString()}</span>
                            <span className="text-gray-500">Posts</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{user.following.toLocaleString()}</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{user.followers.toLocaleString()}</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>

                {/* Tabs for Posts, Media, Likes */}
                <div className="mt-2 ">
                    <Tabs defaultValue="posts">
                        <TabsList className="w-full">
                            <TabsTrigger value="posts" className="flex-1 py-1">{user.name} Posts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="posts">
                            NOthing to display
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </div>
    );
}