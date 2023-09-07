'use client';

import { searchSteps, steps } from '@/constants';
import { useSearchModal } from '@/hooks';
import { formatISO } from 'date-fns/esm';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, Counter, CountrySelect, Heading, Modal } from '..';

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState();
    const [step, setStep] = useState(searchSteps.location);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const Map = useMemo(
        () => dynamic(() => import('../Map'), { ssr: false }),
        [location]
    );

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit = useCallback(() => {
        if (step !== searchSteps.info) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = queryString.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setStep(searchSteps.location);
        searchModal.onClose();
        router.push(url);
    }, [
        step,
        onNext,
        params,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        searchModal,
        router,
    ]);

    const actionLabel = useMemo(() => {
        if (step === searchSteps.info) {
            return 'Search';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === searchSteps.location) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <>
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where do you wanna go?"
                    subtitle="Find the perfec location!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setLocation(value)}
                />
                <hr />
                <Map center={location?.latlng} />
            </div>
        </>
    );

    if (step === searchSteps.date) {
        bodyContent = (
            <>
                <div className="flex flex-col gap-8">
                    <Heading
                        title="When do you plan to go?"
                        subtitle="Make sure everyone is free!"
                    />
                    <Calendar
                        value={dateRange}
                        onChange={(value) => setDateRange(value.selection)}
                    />
                </div>
            </>
        );
    }

    if (step === searchSteps.info) {
        bodyContent = (
            <>
                <div className="flex flex-col gap-8">
                    <Heading
                        title="More information"
                        subtitle="Find your perfex place!"
                    />
                    <Counter
                        title="Guests"
                        subtitle="How many guests are coming?"
                        value={guestCount}
                        onChange={(value) => setGuestCount(value)}
                    />
                    <Counter
                        title="Rooms"
                        subtitle="How many rooms do you need?"
                        value={roomCount}
                        onChange={(value) => setRoomCount(value)}
                    />
                    <Counter
                        title="Bathrooms"
                        subtitle="How many bathrooms do you need?"
                        value={bathroomCount}
                        onChange={(value) => setBathroomCount(value)}
                    />
                </div>
            </>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            body={bodyContent}
            actionLabel={actionLabel}
            secondaryAction={step === searchSteps.location ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
        />
    );
};

export default SearchModal;
