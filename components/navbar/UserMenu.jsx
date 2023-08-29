'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { useLoginModal, useRegisterModal, useRentModal } from '@/hooks';
import { MenuItem } from '..';

const UserMenu = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // open rent modal
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </div>

                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Image
                            className="rounded-full"
                            alt="Avatar"
                            width={30}
                            height={30}
                            src={
                                currentUser?.image || '/images/placeholder.jpg'
                            }
                        />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    handleClick={() => {}}
                                    label="My trips"
                                />
                                <MenuItem
                                    handleClick={() => {}}
                                    label="My favorites"
                                />
                                <MenuItem
                                    handleClick={() => {}}
                                    label="My reservations"
                                />
                                <MenuItem
                                    handleClick={() => {}}
                                    label="My properties"
                                />
                                <MenuItem
                                    handleClick={rentModal.onOpen}
                                    label="Airbnd my home"
                                />
                                <hr />
                                <MenuItem
                                    handleClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    handleClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    handleClick={registerModal.onOpen}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
