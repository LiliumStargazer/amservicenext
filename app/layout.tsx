
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AM Service",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
            <body className={inter.className} data-theme="dark">
                <SessionProvider>
                        <div>
                            {children}
                        </div>
                </SessionProvider>
            </body>
        </html>
    );
}