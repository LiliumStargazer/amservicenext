
import { Inter } from "next/font/google";
import "./globals.css";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import TankStackProvider from "@/src/providers/TanstackProvidet";

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