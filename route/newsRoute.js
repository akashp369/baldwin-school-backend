const express = require('express');
const router = express.Router();
const admissionNewsController = require('../controller/newsController');
const { verifyAccessToken } = require('../middleware/helpers');


// Admission News Routes
router.post('/create', verifyAccessToken, admissionNewsController.createAdmissionNews);
router.get('/all', admissionNewsController.getAllAdmissionNews);
router.get('/:id', admissionNewsController.getSingleAdmissionNews);
router.put('/:id', verifyAccessToken, admissionNewsController.updateAdmissionNews);
router.delete('/:id', verifyAccessToken, admissionNewsController.deleteAdmissionNews);


module.exports = router;