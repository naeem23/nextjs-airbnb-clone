'use client';

import { useMemo, useState } from 'react';

import { useRentModal } from '@/hooks';
import { CategoryInput, CountrySelect, Heading, Modal } from '..';
import { categories, steps } from '@/constants';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const RentModal = () => {
    const rentModal = useRentModal();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(steps.category);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });

    const category = watch('category');
    const location = watch('location');

    const Map = useMemo(
        () =>
            dynamic(() => import('../Map'), {
                ssr: false,
            }),
        [location]
    );

    const setCustomValue = (id, value) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === steps.price) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === steps.category) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue('category', category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === steps.location) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guest find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            title="Airbnb your home!"
            actionLabel={actionLabel}
            secondaryAction={step === steps.category ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            body={bodyContent}
        />
    );
};

export default RentModal;
