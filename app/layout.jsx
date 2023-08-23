import './globals.css';
import { Nunito } from 'next/font/google';
import { Navbar, RegisterModal } from '@/components';
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
                <RegisterModal />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
