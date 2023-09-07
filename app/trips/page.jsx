import { getCurrentUser, getReservations } from '@/actions';
import { EmptyState } from '@/components';
import TripsClient from './TripsClient';

const TripPage = async () => {
    const currentUser = await getCurrentUser();
    console.log(currentUser);

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const reservations = await getReservations({ userId: currentUser.id });
    console.log(reservations);

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven't reserved any trips"
            />
        );
    }

    return (
        <TripsClient reservations={reservations} currentUser={currentUser} />
    );
};

export default TripPage;
