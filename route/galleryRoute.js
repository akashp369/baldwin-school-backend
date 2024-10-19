const express = require('express');
const router = express.Router();
const eventsGalleryController = require('../controller/eventsGalleryController');
const coCurricularGalleryController = require('../controller/coCurricularGalleryController');
const multer = require('multer'); // Use multer for file uploads
const { verifyAccessToken } = require('../middleware/helpers');
const upload = require("../middleware/multer")

// Routes for Events Gallery
router.post('/events/create',  verifyAccessToken, upload.single('image'), eventsGalleryController.createEventGallery);
router.get('/events/all', eventsGalleryController.getAllEventGallery);
router.get('/events/:id', eventsGalleryController.getSingleEventGallery);
router.delete('/events/delete/:id',  verifyAccessToken, eventsGalleryController.deleteEventGallery);

// Routes for Co-curricular Gallery
router.post('/co-curricular/create',  verifyAccessToken, upload.single('image'), coCurricularGalleryController.createCoCurricularGallery);
router.get('/co-curricular/all', coCurricularGalleryController.getAllCoCurricularGallery);
router.get('/co-curricular/:id', coCurricularGalleryController.getSingleCoCurricularGallery);
router.delete('/co-curricular/delete/:id',  verifyAccessToken, coCurricularGalleryController.deleteCoCurricularGallery);

module.exports = router;
