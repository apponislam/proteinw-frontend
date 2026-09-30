export const translateCategory = (category?: string): string => {
    if (!category) return "";
    const cat = category.trim();
    const map: Record<string, string> = {
        "Scented Candles": "Doftljus",
        "Premium Socks": "Strumpor",
        "Reed Diffusers": "Doftpinnar",
        "SCENTED CANDLES": "Doftljus",
        "PREMIUM SOCKS": "Strumpor",
        "REED DIFFUSERS": "Doftpinnar",
        ScentedCandles: "Doftljus",
        PremiumSocks: "Strumpor",
        ReedDiffusers: "Doftpinnar",
    };
    return map[cat] || map[cat.toUpperCase()] || cat;
};
