import getCurrentUser from '@/actions/getCurrentUser';
import getListingByid from '@/actions/getListingById';
import { EmptyState, ListingClient } from '@/components';

const ListingPage = async ({ params }) => {
    const listing = await getListingByid(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return <EmptyState />;
    }
    return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
