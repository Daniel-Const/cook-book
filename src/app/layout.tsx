import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertContextProvider } from "@/context/AlertContext";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cook Book",
    description: "Take control of dinner time!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AlertContextProvider>
                    <Layout>
                        {children}
                    </Layout>
                </AlertContextProvider>
            </body>
        </html>
    );
}
