'use client';

import Image from 'next/image';

import { useCountries } from '@/hooks';
import { ListingCategory } from '..';
import dynamic from 'next/dynamic';

const ListingInfo = ({
    category,
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    const Map = dynamic(() => import('../Map'), { ssr: false });

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Image
                        className="rounded-full"
                        height="30"
                        width="30"
                        alt="Avatar"
                        src={user?.image || '/images/placeholder.jpg'}
                    />
                </div>

                <div className="flex items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathroomCount</div>
                </div>
            </div>
            <hr />

            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />

            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />

            <Map center={coordinates} />
        </div>
    );
};

export default ListingInfo;
