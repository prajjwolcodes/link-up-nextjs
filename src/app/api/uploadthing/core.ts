import { createUploadthing, type FileRouter } from "uploadthing/next";
import { validateRequest } from "../auth/[...nextauth]/options";
import { db } from "@/lib/prisma";

const f = createUploadthing();

export const uploadRouter = {
    // Define file routes with different rules
    avatar: f({ image: { maxFileSize: "512KB" } })
        .middleware(async ({ req }) => {
            const { user } = await validateRequest() as { user: { username: string, id: string } | null };

            if (!user) { throw new Error("Unauthorized"); }

            return { user: user };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // Handle upload completion
            const newAvatarUrl = file.ufsUrl.replace("/f", `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/a/`);
            await db.user.update({
                where: { id: metadata.user.id },
                data: { avatarUrl: newAvatarUrl },
            });

            console.log("Upload complete:", file.ufsUrl);
            return { message: "Upload complete", avatarUrl: newAvatarUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;