'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Users } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import FollowButton from "./FollowButton";
import UserToolTip from "./UserToolTip";
import { UserProps } from "@/lib/types";



const fetchUsers = async () => {
    const res = await axios.get('/api/users/otherusers');
    return res.data;
}

const FollowList = ({ loggedInUserId }: { loggedInUserId: string }) => {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers
    });

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Who to Follow</h2>
            </div>
            <div className="space-y-4">
                {users?.map((user: UserProps) => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <UserToolTip user={user} loggedInUserId={loggedInUserId}>
                                <Link href={`/user/${user.username}`}>
                                    <Avatar>
                                        <AvatarImage className="w-12 h-12" src={user.avatarUrl || undefined} alt="display picture" />
                                        <AvatarFallback className='bg-gradient-to-br from-purple-400 to-pink-500 text-white'>
                                            {user.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </UserToolTip>

                            <div>
                                <UserToolTip user={user} loggedInUserId={loggedInUserId}>
                                    <Link href={`/user/${user.username}`}>

                                        <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                                            {user.displayName}
                                        </h3>
                                    </Link>
                                </UserToolTip>
                                <p className="text-sm text-gray-500">{user.username}</p>
                            </div>
                        </div>

                        <FollowButton loggedInUserId={loggedInUserId} user={user} />
                    </div>
                ))}
            </div>

            <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium w-full text-left">
                Show more
            </button>
        </div>
    );
};

export default FollowList;
