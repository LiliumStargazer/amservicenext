
import { Inter } from "next/font/google";
import "./globals.css";
import TankStackProvider from "@/app/lib/providers/TanstackProvidet";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AM Service",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className} data-theme="dark">
            <TankStackProvider>
                <div>{children}
                </div>
            </TankStackProvider>
            </body>
        </html>
    );
}