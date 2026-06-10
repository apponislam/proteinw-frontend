export const getImageUrl = (imageUrl: string | undefined | null): string => {
    if (!imageUrl) {
        return "";
    }
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
    }
    const baseApi = process.env.NEXT_PUBLIC_BASE_API || "";
    return `${baseApi}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};
