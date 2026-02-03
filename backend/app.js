import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

import connectDB from "./src/config/mongose.config.js";
import ShortUrl from "./src/models/shorturl.model.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", async (req, res) => {
  try {
    const { url } = req.body; // ✅ extract string

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortUrl = nanoid(7); // ✅ correct usage

    const newUrl = await ShortUrl.create({
      full_url: url,           // ✅ string
      short_url: shortUrl,     // ✅ string
      user: "65f123abc456def789012345" // ⚠️ TEMP user ID
    });

    res.status(201).json({
      short_url: shortUrl,
      full_url: newUrl.full_url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create short URL" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const urlEntry = await ShortUrl
        .findOne({ short_url: shortUrl });
    if (urlEntry) {
      urlEntry.clicks += 1;
      await urlEntry.save();
      return res.redirect(urlEntry.full_url);
    }
    res.status(404).json({ error: "Short URL not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to redirect" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  connectDB();
  console.log("Server running at http://localhost:3000");
});
