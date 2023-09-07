'use client';

import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center">
            <HashLoader size={60} color="#F43F5E" />
        </div>
    );
};

export default loading;
