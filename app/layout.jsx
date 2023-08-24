import './globals.css';
import { Nunito } from 'next/font/google';
import { LoginModal, Navbar, RegisterModal } from '@/components';
import ToasterProvider from '@/providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <LoginModal />
                <RegisterModal />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
