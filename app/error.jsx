'use client';

import { EmptyState } from '@/components';
import { useEffect } from 'react';

const ErrorState = ({ error }) => {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
