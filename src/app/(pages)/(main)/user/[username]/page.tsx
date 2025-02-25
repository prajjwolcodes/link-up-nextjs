import React from 'react'
import UserProfile from '../../components/UserProfile'
import TrendsSidebar from '@/components/TrendsSidebar'

const Profile = ({ params }: { params: { username: string } }) => {
    console.log(params.username)
    return (
        <div className='flex gap-2 p-2 space-y-4'>
            <UserProfile />
            <TrendsSidebar />
        </div>
    )
}

export default Profile