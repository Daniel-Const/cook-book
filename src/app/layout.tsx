import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AlertContextProvider } from '@/context/AlertContext';
import Layout from '@/components/layout/Layout';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto'
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cook Book',
    description: 'Take control of dinner time!'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <body className={inter.className}> */}
            <body className={roboto.variable}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <AlertContextProvider>
                            <Layout>{children}</Layout>
                        </AlertContextProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
