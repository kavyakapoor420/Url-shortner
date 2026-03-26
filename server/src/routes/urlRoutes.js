import express from "express";
import { createShortUrl, getMyUrls } from "../controllers/urlController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getMyUrls).post(createShortUrl);

export default router;
