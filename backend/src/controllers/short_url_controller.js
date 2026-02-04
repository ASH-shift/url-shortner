import { shortUrlService } from "../services/short_url_service.js";
export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        const newUrl = await shortUrlService(url);

        res.status(201).json({
            short_url: process.env.APP_URL + "/" + newUrl.short_url
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
