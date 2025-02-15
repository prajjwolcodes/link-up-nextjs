import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
    return (
        <div className="space-y-6">
            <PostSkeletonDemo />
            <PostSkeletonDemo />
            <PostSkeletonDemo />
        </div>


    );
}


function PostSkeletonDemo() {
    return (
        <div className="space-y-4 w-full">
            {/* Avatar + Name */}
            <div className="w-full flex items-center mt-4 space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
                <div className="flex gap-2 flex-col">
                    <Skeleton className="h-3 w-32" /> {/* Name */}
                    <Skeleton className="h-3 w-52" /> {/* Name */}
                </div>

            </div>

            {/* Content Placeholder */}
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-3/4" />
        </div>
    )
}

