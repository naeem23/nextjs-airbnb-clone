'use client';

import { categories } from '@/constants';
import { useMemo } from 'react';
import { Container, ListingHead, ListingInfo } from '..';

const ListingClient = ({ listing, currentUser }) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);
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
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
