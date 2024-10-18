const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announcementController');
const { verifyAccessToken } = require('../middleware/helpers');



// Announcement Routes
router.post('/announcement/create', verifyAccessToken, announcementController.createAnnouncement);
router.get('/announcement/all', announcementController.getAllAnnouncements);
router.get('/announcement/:id', announcementController.getSingleAnnouncement);
router.put('/announcement/:id', verifyAccessToken,  announcementController.updateAnnouncement);
router.delete('/announcement/:id', verifyAccessToken,  announcementController.deleteAnnouncement);

module.exports = router;
