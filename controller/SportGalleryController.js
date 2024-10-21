const SportGallery = require('../modal/sportGalleryModel'); // Import the SportGallery model
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');
const { uploadOnCloudinary } = require('../middleware/cloudinary');

// Create a new sport gallery entry
module.exports.createSportGallery = asyncHandler(async (req, res) => {
    try {
        const { category } = req.body;

        if (!category || !req.file) {
            return response.validationError(res, "Category and image are required.");
        }

        if (!['Outdoor', 'Indoor'].includes(category)) {
            return response.validationError(res, "Invalid category. Must be 'Outdoor' or 'Indoor'.");
        }

        const imageUrl = await uploadOnCloudinary(req.file); // Upload image to Cloudinary
        if (!imageUrl) {
            return response.internalServerError(res, "Image upload failed.");
        }

        const newGallery = new SportGallery({
            category,
            image: imageUrl
        });

        const savedGallery = await newGallery.save();
        if (!savedGallery) {
            return response.internalServerError(res, "Unable to save gallery.");
        }

        response.successResponse(res, savedGallery, "Sport gallery entry created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get all sport gallery entries
module.exports.getAllSportGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntries = await SportGallery.find();
        response.successResponse(res, galleryEntries, "Sport gallery entries retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get a single sport gallery entry by ID
module.exports.getSingleSportGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntry = await SportGallery.findById(req.params.id);
        if (!galleryEntry) {
            return response.notFoundError(res, "Sport gallery entry not found.");
        }

        response.successResponse(res, galleryEntry, "Sport gallery entry retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Delete a sport gallery entry by ID
module.exports.deleteSportGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntry = await SportGallery.findByIdAndDelete(req.params.id);

        if (!galleryEntry) {
            return response.notFoundError(res, "Sport gallery entry not found.");
        }

        response.successResponse(res, galleryEntry, "Sport gallery entry deleted successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});
