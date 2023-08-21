import './globals.css';
import { Nunito } from 'next/font/google';
import { Navbar } from '@/components';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
