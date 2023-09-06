import prisma from '@/libs/prismadb';

export default async function getReservations(params) {
    try {
        const { listingId, userId, authorId } = params;

        const query = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeReservations = reservations.map((item) => ({
            ...item,
            createdAt: item.createdAt.toISOString(),
            startDate: item.startDate.toISOString(),
            endDate: item.endDate.toISOString(),
            listing: {
                ...item.listing,
                createdAt: item.listing.createdAt.toISOString(),
            },
        }));

        return safeReservations;
    } catch (error) {
        throw new Error(error);
    }
}
