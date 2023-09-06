'use client';

import Link from 'next/link';

const MenuItem = ({ handleClick, label, href }) => {
    return (
        <>
            {href ? (
                <Link href={href}>
                    <div
                        onClick={handleClick}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                        {label}
                    </div>
                </Link>
            ) : (
                <div
                    onClick={handleClick}
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                    {label}
                </div>
            )}
        </>
    );
};

export default MenuItem;
