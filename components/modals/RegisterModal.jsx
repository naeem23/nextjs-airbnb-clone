'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import useRegisterModal from '@/hooks/useRegisterModal';
import { Button, Heading, Input, Modal } from '..';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        axios
            .post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                handleClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                handleClick={() => signIn('github')}
            />
            <div className="text-slate-700 font-normal text-center mt-4">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="text-sky-600 cursor-pointer hover:underline"
                >
                    Log in
                </Link>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
