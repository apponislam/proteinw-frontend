import React from "react";
import StoreProduct from "./StoreProduct";

interface Product {
    isNewCollection?: boolean;
    isBestseller?: boolean;
    name: string;
    price: string;
    description: string;
    image: string;
}

const StoreProducts = () => {
    const products: Product[] = [
        {
            isNewCollection: true,
            name: "Midnight Diffuser",
            price: "180 SEK",
            description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
            image: "/products/product1.png",
        },
        {
            isBestseller: true,
            name: "Heritage Wool Mix",
            price: "180 SEK",
            description: "Breathable organic cotton blend. Reinforced heel and toe for",
            image: "/products/product2.png",
        },
        {
            name: "Forest Pine Candle",
            price: "180 SEK",
            description: "Crisp pine needles and fresh mountain air. 45-hour burn time.",
            image: "/products/product3.png",
        },
    ];

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
                <StoreProduct key={idx} isNewCollection={product.isNewCollection} isBestseller={product.isBestseller} name={product.name} price={product.price} description={product.description} image={product.image} />
            ))}
        </div>
    );
};

export default StoreProducts;
