const Testimonial = require('../modal/testimonialModel');
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');


module.exports.createTestimonial = asyncHandler(async (req, res) => {
    const { name, body, stars, avatar } = req.body;

    if (!name || !body || !avatar) {
        return response.validationError(res, 'All fields are required.');
    }

    try {
        const newTestimonial = new Testimonial({ name, body, stars:5, avatar });
        const savedTestimonial = await newTestimonial.save();

        response.successResponse(
            res,
            savedTestimonial,
            'Testimonial created successfully'
        );
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
  

