import express from "express";
import {createShortUrl} from "../controllers/short_url_controller.js";
const router= express.Router();


router.post("/create",createShortUrl)
export default router;