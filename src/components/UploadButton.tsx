"use client"

import { UploadButton } from "@/lib/Uploadthing";

const Uploadbutton = () => {
    return (
        <UploadButton
            endpoint="avatar"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
            }}
        />)
}

export default Uploadbutton