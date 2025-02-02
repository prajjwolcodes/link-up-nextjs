import React from 'react'

const FollowSection = () => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">Who to follow</h2>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                        <div className="flex-1">
                            <p className="font-medium">User Name</p>
                            <p className="text-sm text-gray-500">@username</p>
                        </div>
                        {/* <Button variant="outline" size="sm">Follow</Button> */}
                    </div>
                ))}
            </div>
        </>)
}

export default FollowSection