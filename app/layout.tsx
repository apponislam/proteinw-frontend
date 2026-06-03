import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "../providers/ReduxProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kungsbjörnen",
    description: "Kungsbjörnen - Protein fundraising",
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
            <body>
                <ReduxProviders>
                    <TooltipProvider>{children}</TooltipProvider>
                </ReduxProviders>
            </body>
        </html>
    );
}
