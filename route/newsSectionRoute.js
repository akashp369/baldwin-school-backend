const express = require("express");
const asyncHandler = require("express-async-handler");
const NewsSection = require("../modal/newsSectionModel");
const response = require("../middleware/responseMiddleware");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../middleware/cloudinary");
const { verifyAccessToken } = require("../middleware/helpers");
const upload = require("../middleware/multer")


const router = express.Router();

// 1. Create News Section
router.post(
  "/create",
  verifyAccessToken,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    try {
      const { heading, body, date } = req.body;

      if (!req.file) {
        return response.validationError(res, "Image is required.");
      }

      const image = await uploadOnCloudinary(req.file); // Upload image to Cloudinary

      const newNews = new NewsSection({
        image,
        heading,
        body,
        date,
      });

      const savedNews = await newNews.save();
      response.successResponse(res, savedNews, "News section created successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 2. Get All News Sections
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const newsList = await NewsSection.find().sort({ createdAt: -1 });
      response.successResponse(res, newsList, "All news sections fetched successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 3. Get Single News Section
router.get(
  "/single/:id",
  asyncHandler(async (req, res) => {
    try {
      const news = await NewsSection.findById(req.params.id);
      if (!news) {
        return response.notFoundError(res, "News section not found.");
      }
      response.successResponse(res, news, "News section fetched successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 4. Update News Section
router.post(
  "/update/:id",
  verifyAccessToken,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    try {
      const { heading, body, date } = req.body;

      const news = await NewsSection.findById(req.params.id);
      if (!news) {
        return response.notFoundError(res, "News section not found.");
      }

      if (req.file) {
        const image = await uploadOnCloudinary(req.file);
        news.image = image;
      }

      news.heading = heading;
      news.body = body;
      news.date = date;

      const updatedNews = await news.save();
      response.successResponse(res, updatedNews, "News section updated successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 5. Delete News Section
router.delete(
  "/delete/:id",
  verifyAccessToken,
  asyncHandler(async (req, res) => {
    try {
      const news = await NewsSection.findByIdAndDelete(req.params.id);
      if (!news) {
        return response.notFoundError(res, "News section not found.");
      }
      response.successResponse(res, null, "News section deleted successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

module.exports = router;
