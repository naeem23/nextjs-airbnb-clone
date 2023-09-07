import { getCurrentUser, getFavoriteListings } from '@/actions';
import { EmptyState } from '@/components';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const listings = await getFavoriteListings();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        );
    }

    return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
