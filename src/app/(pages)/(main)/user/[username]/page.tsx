import React from 'react'
import UserProfile from '../../components/UserProfile'
import TrendsSidebar from '@/components/TrendsSidebar'
import { validateRequest } from '@/app/api/auth/[...nextauth]/options'

const Profile = async ({ params }: { params: { username: string } }) => {
    const { user: loggedInUser } = await validateRequest() as { user: { id: string } }
    const { username } = await params

    return (
        <div className='grid grid-cols-4 gap-2 p-2 space-y-4'>
            <div className='col-span-3'>
                <UserProfile username={username} loggedInUser={loggedInUser} />
            </div>
            <div className='col-start-4'>
                <TrendsSidebar />
            </div>
        </div>
    )
}

export default Profile