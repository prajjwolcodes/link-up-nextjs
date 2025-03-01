'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const Test = () => {
    const data = useQuery({
        queryKey: ["follower-info", 12],
        queryFn: () =>
            axios.get(`/api/users/followers/cm6kndxtk0000i0dawr4kt6oj`),
        // initialData: initialState,
        staleTime: Infinity,
    });

    return (
        <div></div>
    )
}

export default Test