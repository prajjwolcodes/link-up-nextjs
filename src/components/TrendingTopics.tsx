import React from 'react';
import getAllHashtags from '@/lib/getAllHashtags';
import Link from 'next/link';

const TrendingTopics = async () => {
    const hashtags = await getAllHashtags();

    return (
        <div className="">
            <div className="flex gap-2 mb-3">
                <h2 className="text-xl font-bold text-gray-800">Trending Topics</h2>
            </div>

            <div className="flex flex-wrap gap-2">
                {hashtags.map((row, index) => {
                    const title = row.hashtag.replace("#", "");
                    return (
                        <Link
                            href={`/hashtag/${title}`}
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 cursor-pointer text-sm font-medium">
                            #{title}
                            <span className="ml-1 text-xs bg-blue-100 px-2 py-0.5 rounded-full">
                                {row.count}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default TrendingTopics;