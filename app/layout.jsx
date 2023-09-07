import './globals.css';
import { Nunito } from 'next/font/google';
import {
    LoginModal,
    Navbar,
    RegisterModal,
    RentModal,
    SearchModal,
} from '@/components';
import ToasterProvider from '@/providers/ToasterProvider';
import { getCurrentUser } from '@/actions';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone',
};

export default async function RootLayout({ children }) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <RentModal />
                <LoginModal />
                <RegisterModal />
                <SearchModal />
                <Navbar currentUser={currentUser} />
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
