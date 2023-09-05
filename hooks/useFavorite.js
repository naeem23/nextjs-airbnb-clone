import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

import useLoginModal from './useLoginModal';

const useFavorite = ({ listingId, currentUser }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [listingId, currentUser]);

    const toggleFavorite = useCallback(
        async (e) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                let request, msg;

                if (hasFavorited) {
                    request = () => axios.delete(`/api/favorites/${listingId}`);
                    msg = 'Removed from favorite list.';
                } else {
                    request = () => axios.post(`/api/favorites/${listingId}`);
                    msg = 'Added to favorite list.';
                }

                await request();
                router.refresh();
                toast.success(msg);
            } catch (error) {
                toast.error('Something went wrong.');
            }
        },
        [currentUser, listingId, hasFavorited, loginModal, router]
    );

    return { hasFavorited, toggleFavorite };
};

export default useFavorite;
