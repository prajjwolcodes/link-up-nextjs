import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const RelativeTime = ({ createdAt }: { createdAt: string }) => {
    return (
        <span>{dayjs(createdAt).fromNow()} </span>
    )
};

export default RelativeTime;
