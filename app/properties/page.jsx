import { getCurrentUser, getListings } from '@/actions';
import { EmptyState } from '@/components';
import PropertiesClient from './PropertiesClient';

const TripPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        );
    }

    return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default TripPage;
