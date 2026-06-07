import React from "react";

const StoreHeader = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="shrink-0">
                        <h1 className="text-xl font-bold text-black">Kungsbjörnen</h1>
                    </div>
                    <div className="flex items-center border-b border-[#F59E0B]">
                        <span className="text-sm font-medium text-[#F59E0B]">Storefront</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default StoreHeader;
