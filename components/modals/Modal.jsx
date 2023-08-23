'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '..';

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* CONTENT */}
                    <div
                        className={`translate duration-300 h-full ${
                            showModal ? 'translate-y-0' : 'translate-y-full'
                        } ${showModal ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* HEADER */}
                            <div className="flex items-center justify-between p-6 rounded-t border-b-[1px]">
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-1 border-0 hover:opacity-70 transition"
                                >
                                    <IoMdClose size={18} />
                                </button>
                            </div>{' '}
                            {/* END HEADER */}
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">{body}</div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction &&
                                        secondaryActionLabel && (
                                            <Button
                                                outline
                                                disabled={disabled}
                                                label={secondaryActionLabel}
                                                handleClick={secondaryAction}
                                            />
                                        )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        handleClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>{' '}
                    {/* END CONTENT */}
                </div>
            </div>
        </>
    );
};

export default Modal;
