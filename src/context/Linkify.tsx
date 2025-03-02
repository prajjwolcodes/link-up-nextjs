import Link from 'next/link';
import { LinkIt, LinkItUrl } from 'react-linkify-it';

export default function Linkify({ children }: { children: React.ReactNode }) {
    return (
        <LinkUrl>
            <LinkHashtags>
                <LinkUsername>
                    {children}
                </LinkUsername>
            </LinkHashtags>
        </LinkUrl>
    )
}

function LinkUrl({ children }: { children: React.ReactNode }) {
    return (
        <LinkItUrl className='text-blue-700 hover:underline'>
            {children}
        </LinkItUrl>
    )
}

function LinkHashtags({ children }: { children: React.ReactNode }) {
    const regexToMatch = /#\w+/g
    return (
        <LinkIt component={(match, key) => <Link className='text-blue-700 hover:underline' href={"/hashtag/" + match.slice(1)} key={key}>{match}</Link>}
            regex={regexToMatch}>
            {children}
        </LinkIt>
    );
}

function LinkUsername({ children }: { children: React.ReactNode }) {
    const regexToMatch = /@\w+/g
    return (
        <LinkIt component={(match, key) => <Link className='text-blue-700 hover:underline' href={"/user/" + match.slice(1)} key={key}>{match}</Link>}
            regex={regexToMatch}>
            {children}
        </LinkIt>
    );
}




