"use client"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Posts from "./components/Posts";
import { useEffect, useRef } from "react";
import PostSkeleton from "./components/PostSkeleton";
import { useSession } from "next-auth/react";


// SIMPLE REACT QUERY EXAMPLE

// const fetchPosts = async () => {
//     const res = await axios.get("/api/post/for-you?page=12&limit=18");
//     return res.data;
// };

// export default function FollowingFeed() {
//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["post-feed", "for-you"],
//         queryFn: fetchPosts,
//     });

//     if (isLoading) return <p><Loader2 className="animate-spin flex items-center" /></p>;
//     if (isError) return <p>Something went wrong</p>;

//     return (
//         <div>
//             <Posts posts={data.posts} />
//         </div>
//     );
// }

const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/api/post/followingposts?page=${pageParam}&limit=7`);
    return { data: res.data, nextPage: res.data.nextPage };
};

export default function FollowingFeed() {

    const { data: session } = useSession();
    const user = session?.user;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ["post-feed", "following"],
        queryFn: fetchPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage, // Get next page number: (lastPage) => (lastPage.data.length ? lastPage.nextPage : undefined),
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [fetchNextPage, hasNextPage]);


    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    if (isLoading) return <PostSkeleton />;
    if (isError) return <p>Something went wrong</p>;



    return (
        <div>
            {data?.pages.map((page, index) =>
                <Posts key={index} posts={page.data.posts} userId={user?.id ?? ''} />
            )}

            {/* button to load more  */}

            {/* <div className="flex items-center w-full justify-center ">
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className={`${!hasNextPage || isFetchingNextPage && "bg-gray-800"} bg-primary text-white px-4 py-2 rounded-md mt-4`}>
                    {isFetchingNextPage && <Loader2 className="animate-spin flex items-center" />}
                    {!hasNextPage || isFetchingNextPage ? "No more posts" : "Load more"}
                </button>
            </div> */}



            {/* INFINITE SCROLL  */}

            <div ref={loadMoreRef} className="text-center mt-4">
                {isFetchingNextPage ? <p>Loading more...</p> : !hasNextPage ? <p>Follow people to see posts</p> : <p>Scroll down to see more</p>}
            </div>
        </div>
    );
}