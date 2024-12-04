const Testimonial = require('../modal/testimonialModel');
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');
const { uploadOnCloudinary } = require("../middleware/cloudinary");


module.exports.createTestimonial = asyncHandler(async (req, res) => {
    try {
        const { name, body, stars = 5 } = req.body;

        // Check if required fields are provided
        if (!name || !body || !req.file) {
            return response.validationError(res, "All fields, including an avatar image, are required.");
        }

        // Upload avatar to Cloudinary
        const avatarUrl = await uploadOnCloudinary(req.file);
        if (!avatarUrl) {
            return response.internalServerError(res, "Avatar image upload failed.");
        }

        // Create the testimonial
        const newTestimonial = new Testimonial({
            name,
            body,
            stars,
            avatar: avatarUrl
        });

        const savedTestimonial = await newTestimonial.save();
        if (!savedTestimonial) {
            return response.internalServerError(res, "Cannot save the testimonial.");
        }

        response.successResponse(res, savedTestimonial, "Testimonial created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});



// Get all testimonials
module.exports.getAllTestimonials = asyncHandler(async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        response.successResponse(
            res,
            testimonials,
            'Testimonials retrieved successfully'
        );
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


// Delete a testimonial by ID
module.exports.deleteTestimonial = asyncHandler(async (req, res) => {
    try {
      const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
      if (!testimonial) {
        return response.notFoundError(res, 'Testimonial not found.');
      }
      response.successResponse(res, testimonial, 'Testimonial deleted successfully.');
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });
  

