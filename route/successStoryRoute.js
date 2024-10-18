const express = require("express");
const asyncHandler = require("express-async-handler");
const SuccessStory = require("../modal/successStoryModel");
const response = require("../middleware/responseMiddleware");
const { uploadOnCloudinary } = require("../middleware/cloudinary");
const { verifyAccessToken } = require("../middleware/helpers");

const router = express.Router();

// 1. Create Success Story
router.post(
  "/create",
  verifyAccessToken,
  asyncHandler(async (req, res) => {
    try {
      const { headline, body, date } = req.body;

      if (!req.file) {
        return response.validationError(res, "Image is required.");
      }

      const image = await uploadOnCloudinary(req.file); // Upload image to Cloudinary

      const newStory = new SuccessStory({
        image,
        headline,
        body,
        date,
      });

      const savedStory = await newStory.save();
      response.successResponse(res, savedStory, "Success story created successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 2. Get All Success Stories
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const successList = await SuccessStory.find().sort({ createdAt: -1 });
      response.successResponse(res, successList, "All success stories fetched successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 3. Get Single Success Story
router.get(
  "/single/:id",
  asyncHandler(async (req, res) => {
    try {
      const success = await SuccessStory.findById(req.params.id);
      if (!success) {
        return response.notFoundError(res, "Success story not found.");
      }
      response.successResponse(res, success, "Success story fetched successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 4. Update Success Story
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    try {
      const { headline, body, date } = req.body;

      const success = await SuccessStory.findById(req.params.id);
      if (!success) {
        return response.notFoundError(res, "Success story not found.");
      }

      if (req.file) {
        const image = await uploadOnCloudinary(req.file);
        success.image = image;
      }

      success.headline = headline;
      success.body = body;
      success.date = date;

      const updatedStory = await success.save();
      response.successResponse(res, updatedStory, "Success story updated successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

// 5. Delete Success Story
router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    try {
      const success = await SuccessStory.findById(req.params.id);
      if (!success) {
        return response.notFoundError(res, "Success story not found.");
      }

      await success.remove();
      response.successResponse(res, null, "Success story deleted successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  })
);

module.exports = router;
