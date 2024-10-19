const CoCurricularGallery = require('../modal/coCurricularGalleryModel'); // Import the CoCurricularGallery model
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');
const { uploadOnCloudinary } = require('../middleware/cloudinary');

// Create a new co-curricular gallery entry
module.exports.createCoCurricularGallery = asyncHandler(async (req, res) => {
    try {
        const { category } = req.body;

        if (!category || !req.file) {
            return response.validationError(res, "Category and image are required.");
        }

        const imageUrl = await uploadOnCloudinary(req.file); // Upload image to Cloudinary
        if (!imageUrl) {
            return response.internalServerError(res, "Image upload failed.");
        }

        const newGallery = new CoCurricularGallery({
            category,
            image: imageUrl
        });

        const savedGallery = await newGallery.save();
        if (!savedGallery) {
            return response.internalServerError(res, "Unable to save gallery.");
        }

        response.successResponse(res, savedGallery, "Co-curricular gallery entry created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get all co-curricular gallery entries
module.exports.getAllCoCurricularGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntries = await CoCurricularGallery.find().populate('category');
        response.successResponse(res, galleryEntries, "Co-curricular gallery entries retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get a single co-curricular gallery entry by ID
module.exports.getSingleCoCurricularGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntry = await CoCurricularGallery.findById(req.params.id).populate('category');
        if (!galleryEntry) {
            return response.notFoundError(res, "Co-curricular gallery entry not found.");
        }

        response.successResponse(res, galleryEntry, "Co-curricular gallery entry retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Delete a co-curricular gallery entry by ID
module.exports.deleteCoCurricularGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntry = await CoCurricularGallery.findByIdAndDelete(req.params.id);

        if (!galleryEntry) {
            return response.notFoundError(res, "Co-curricular gallery entry not found.");
        }

        response.successResponse(res, galleryEntry, "Co-curricular gallery entry deleted successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});
