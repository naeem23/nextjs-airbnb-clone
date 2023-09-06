import { getCurrentUser, getListingById, getReservations } from '@/actions';
import { EmptyState, ListingClient } from '@/components';

const ListingPage = async ({ params }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if (!listing) {
        return <EmptyState />;
    }
    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
        />
    );
};

export default ListingPage;
