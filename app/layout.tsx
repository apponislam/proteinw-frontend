import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "../providers/ReduxProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kungsbjörnen",
    description: "Kungsbjörnen - Protein fundraising",
    icons: {
        icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
                    <TooltipProvider>
                        {children}

                        <Toaster
                            position="top-right"
                            richColors
                            closeButton={true}
                            expand={false}
                            visibleToasts={5}
                            toastOptions={{
                                classNames: {
                                    toast: "bg-white border border-[#FFDEA8] text-[#1A1C1C] shadow-lg rounded-xl",
                                    title: "font-semibold text-[#1A1C1C]",
                                    description: "text-gray-600",
                                    success: "border-green-600 bg-green-50 text-green-900",
                                    error: "border-red-500 bg-red-50 text-red-900",
                                    warning: "border-yellow-500 bg-yellow-50 text-yellow-900",
                                    info: "border-blue-500 bg-blue-50 text-blue-900",
                                    actionButton: "bg-[#7C5800] text-white hover:bg-[#654700]",
                                    cancelButton: "bg-gray-100 text-gray-700 hover:bg-gray-200",
                                    closeButton: "bg-transparent text-gray-500 hover:text-gray-700",
                                },
                            }}
                        />
                    </TooltipProvider>
                </ReduxProviders>
            </body>
        </html>
    );
}
