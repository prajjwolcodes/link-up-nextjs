"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Posts from "./components/Posts";
import { Loader2 } from "lucide-react";

const fetchPosts = async () => {
    const res = await axios.get("/api/post/for-you");
    return res.data;
};

export default function ForyouFeed() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["post-feed", "for-you"],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p><Loader2 className="animate-spin flex items-center" /></p>;
    if (isError) return <p>Something went wrong</p>;

    return (
        <div>
            <Posts posts={data.posts} />
        </div>
    );
}
