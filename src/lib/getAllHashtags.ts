import { unstable_cache } from "next/cache";
import { db } from "@/lib/prisma";

const getHashtagsWithCount = unstable_cache(
    async () => {
        const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
      SELECT 
        LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, 
        COUNT(*) AS count
      FROM posts
      GROUP BY hashtag
      ORDER BY count DESC;
    `;

        return result.map((row) => ({
            hashtag: row.hashtag,
            count: Number(row.count), // Convert bigint to Number
        }));
    },
    ["trending-topics"], // Cache key
    { revalidate: 3 * 60 * 60 } // Refresh every 3 hours
);

export default getHashtagsWithCount;
