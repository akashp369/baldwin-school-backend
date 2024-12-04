const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announcementController');
const { verifyAccessToken } = require('../middleware/helpers');
const upload = require("../middleware/multer")


// Announcement Routes
router.post('/create', verifyAccessToken, upload.single('image'), announcementController.createAnnouncement);
router.get('/all', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getSingleAnnouncement);
router.put('/:id', verifyAccessToken, upload.single('image'), announcementController.updateAnnouncement);
router.delete('/:id', verifyAccessToken, announcementController.deleteAnnouncement);

module.exports = router;
