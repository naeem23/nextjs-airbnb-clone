'use client';

import Link from 'next/link';
import { Categories, Container, Logo, Search, UserMenu } from '..';

const Navbar = ({ currentUser }) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Link href="/">
                            <Logo />
                        </Link>
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>

            {/* Categories section */}
            <Categories />
        </div>
    );
};

export default Navbar;
