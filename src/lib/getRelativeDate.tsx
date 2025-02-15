import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const RelativeTime = ({ createdAt }: { createdAt: string | Date }) => {
    return (
        <span>{dayjs(new Date(createdAt)).fromNow()}</span>
    );
};

export default RelativeTime;