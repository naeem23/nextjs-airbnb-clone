'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { categories } from '@/constants';
import { useLoginModal } from '@/hooks';
import { Container, ListingHead, ListingInfo, ListingReservation } from '..';
import axios from 'axios';
import toast from 'react-hot-toast';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns/esm';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

const ListingClient = ({ listing, currentUser, reservations = [] }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const disabledDates = useMemo(() => {
        let dates = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios
            .post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success('Listing reserved.');
                setDateRange(initialDateRange);
                // router push to trips
                router.refresh();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentUser, loginModal, totalPrice, dateRange, listing?.id, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            category={category}
                            user={listing.user}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />

                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
