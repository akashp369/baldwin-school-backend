const express = require('express');
const router = express.Router();
const testimonialController = require('../controller/testimonialController');
const upload = require("../middleware/multer")
const {verifyAccessToken} = require('../middleware/helpers');

// Testimonial routes
router.post('/create', verifyAccessToken, upload.single('image'), testimonialController.createTestimonial);
router.get('/all', testimonialController.getAllTestimonials);
router.delete('/delete/:id', verifyAccessToken, testimonialController.deleteTestimonial);

module.exports = router;
