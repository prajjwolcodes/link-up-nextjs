import React from 'react'
import UserProfile from '../../components/UserProfile'
import TrendsSidebar from '@/components/TrendsSidebar'
import { db } from '@/lib/prisma'
import { validateRequest } from '@/app/api/auth/[...nextauth]/options'

const Profile = async ({ params }: { params: { username: string } }) => {
    const { username } = await params
    const { user: loggedInUser } = await validateRequest() as { user: { id: string } }

    const clickedUserDetails = await db.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            email: true,
            bio: true,
            followers: {
                select: {
                    followerId: true,
                    followingId: true
                }
            },
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
                },
                orderBy: {
                    createdAt: 'desc'
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

    if (!clickedUserDetails) return {}


    return (
        <div className='grid grid-cols-4 gap-2 p-2 space-y-4'>
            <div className='col-span-3'>
                <UserProfile user={clickedUserDetails} loggedInUser={loggedInUser} />
            </div>
            <div className='col-start-4'>
                <TrendsSidebar />
            </div>
        </div>
    )
}

export default Profile