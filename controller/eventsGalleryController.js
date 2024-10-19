const EventsGallery = require('../modal/eventsGalleryModel'); // Import the EventsGallery model
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');
const { uploadOnCloudinary } = require('../middleware/cloudinary');

// Create a new event gallery entry
module.exports.createEventGallery = asyncHandler(async (req, res) => {
    try {
        const { category } = req.body;

        if (!category || !req.file) {
            return response.validationError(res, "Category and image are required.");
        }

        const imageUrl = await uploadOnCloudinary(req.file); // Upload image to Cloudinary
        if (!imageUrl) {
            return response.internalServerError(res, "Image upload failed.");
        }

        const newGallery = new EventsGallery({
            category,
            image: imageUrl
        });

        const savedGallery = await newGallery.save();
        if (!savedGallery) {
            return response.internalServerError(res, "Unable to save gallery.");
        }

        response.successResponse(res, savedGallery, "Event gallery entry created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get all event gallery entries
module.exports.getAllEventGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntries = await EventsGallery.find().populate('category');
        response.successResponse(res, galleryEntries, "Event gallery entries retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get a single event gallery entry by ID
module.exports.getSingleEventGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntry = await EventsGallery.findById(req.params.id).populate('category');
        if (!galleryEntry) {
            return response.notFoundError(res, "Event gallery entry not found.");
        }

        response.successResponse(res, galleryEntry, "Event gallery entry retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Delete an event gallery entry by ID
module.exports.deleteEventGallery = asyncHandler(async (req, res) => {
    try {
        const galleryEntry = await EventsGallery.findByIdAndDelete(req.params.id);

        if (!galleryEntry) {
            return response.notFoundError(res, "Event gallery entry not found.");
        }

        response.successResponse(res, galleryEntry, "Event gallery entry deleted successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});
