export const translateCategory = (category?: string): string => {
    if (!category) return "";
    const cat = category.trim();
    const map: Record<string, string> = {
        "Scented Candles": "Doftljus",
        "Premium Socks": "Strumpor",
        "Reed Diffusers": "Doftstickor",
        "SCENTED CANDLES": "Doftljus",
        "PREMIUM SOCKS": "Strumpor",
        "REED DIFFUSERS": "Doftstickor",
        "ScentedCandles": "Doftljus",
        "PremiumSocks": "Strumpor",
        "ReedDiffusers": "Doftstickor",
    };
    return map[cat] || map[cat.toUpperCase()] || cat;
};
