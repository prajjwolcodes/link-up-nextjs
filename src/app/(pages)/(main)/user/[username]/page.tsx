import React from 'react'
import UserProfile from '../../components/UserProfile'
import TrendsSidebar from '@/components/TrendsSidebar'
import { db } from '@/lib/prisma'

const Profile = async ({ params }: { params: { username: string } }) => {
    const { username } = await params

    const user = await db.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            email: true,
            bio: true,
            posts: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            username: true,
                            displayName: true,
                            avatarUrl: true
                        }
                    },
                    userId: true
                }
            },
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true
                }
            }
        }
    })

    if (!user) return {}


    return (
        <div className='grid grid-cols-4 gap-2 p-2 space-y-4'>
            <div className='col-span-3'>
                <UserProfile user={user} />
            </div>
            <div className='col-start-4'>
                <TrendsSidebar />
            </div>
        </div>
    )
}

export default Profile