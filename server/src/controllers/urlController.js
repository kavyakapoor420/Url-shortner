import Url from "../models/Url.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateShortCode from "../utils/generateShortCode.js";
import normalizeUrl from "../utils/normalizeUrl.js";

const buildShortUrl = (shortCode) => `${process.env.BASE_URL}/${shortCode}`;

export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    const error = new Error("Original URL is required");
    error.statusCode = 400;
    throw error;
  }

  let normalizedUrl;
  try {
    normalizedUrl = normalizeUrl(originalUrl);
  } catch {
    const error = new Error("Please enter a valid URL");
    error.statusCode = 400;
    throw error;
  }

  let shortCode = generateShortCode();
  while (await Url.exists({ shortCode })) {
    shortCode = generateShortCode();
  }

  const url = await Url.create({
    originalUrl: normalizedUrl,
    shortCode,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Short URL created successfully",
    url: {
      _id: url._id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: buildShortUrl(url.shortCode),
      clicks: url.clicks,
      createdAt: url.createdAt,
    },
  });
});

export const getMyUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ owner: req.user._id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    urls: urls.map((url) => ({
      _id: url._id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: buildShortUrl(url.shortCode),
      clicks: url.clicks,
      createdAt: url.createdAt,
    })),
  });
});

export const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });

  if (!url) {
    const error = new Error("Short URL not found");
    error.statusCode = 404;
    throw error;
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.originalUrl);
});
