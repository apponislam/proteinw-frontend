import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StoreHeroArea = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="min-h-screen flex items-center">
                <div className="relative flex flex-col lg:flex-row items-center w-full">
                    <div className="bg-[#FFFFFFCC] p-6 md:p-12 shadow-[0px_12px_32px_rgba(26,28,28,0.06)] backdrop-blur-3xl rounded-[24px] w-full lg:w-175 lg:relative lg:z-10 lg:-mr-12.5 space-y-6 mb-8 lg:mb-0">
                        <h1 className="text-3xl md:text-5xl font-extrabold">Welcome to Martin Andersson's digital store</h1>
                        <p className="text-base md:text-lg">
                            Hi! I'm fundraising for <span className="text-[#7C5800]">Class 9B's graduation trip</span>. Your support helps us create memories that will last a lifetime. Explore our Nordic-inspired collection below.
                        </p>
                        <Link href="#products-section" className="flex items-center w-fit gap-3 font-bold px-6 py-3 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">
                            Shop Now <ArrowDown />
                        </Link>
                    </div>
                    <div className="w-full lg:flex-1">
                        <Image src="/store/storepic.png" alt="Hero" width={1280} height={500} className="w-full h-75 md:h-100 lg:h-125 object-cover rounded-[24px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreHeroArea;
