import ShortUrl from "../models/shorturl.model.js";
import { generateNanoid } from "../utils/helper.js";

export const shortUrlService = async (url) => {

    if (!url) {
        throw new Error("URL is required");
    }

    const existing = await ShortUrl.findOne({ full_url: url });

    if (existing) return existing;

    const shortCode = generateNanoid(7);

    return await ShortUrl.create({
        full_url: url,
        short_url: shortCode,
        user: "65f123abc456def789012345"
    });
};
