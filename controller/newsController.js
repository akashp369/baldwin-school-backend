const AdmissionNews = require('../modal/newsModal');
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');

module.exports.createAdmissionNews = asyncHandler(async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return response.validationError(res, "Title and description are required.");
        }

        const newAdmissionNews = new AdmissionNews({ title, description });

        const savedAdmissionNews = await newAdmissionNews.save();
        if (!savedAdmissionNews) {
            return response.internalServerError(res, "Unable to save Admission News.");
        }

        response.successResponse(res, savedAdmissionNews, "Admission News created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


module.exports.getAllAdmissionNews = asyncHandler(async (req, res) => {
    try {
        const allNews = await AdmissionNews.find();
        response.successResponse(res, allNews, "Admission News retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


module.exports.getSingleAdmissionNews = asyncHandler(async (req, res) => {
    try {
        const admissionNews = await AdmissionNews.findById(req.params.id);
        if (!admissionNews) {
            return response.notFoundError(res, "Admission News not found.");
        }

        response.successResponse(res, admissionNews, "Admission News retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

module.exports.updateAdmissionNews = asyncHandler(async (req, res) => {
    try {
        const { title, description } = req.body;
        const admissionNews = await AdmissionNews.findById(req.params.id);

        if (!admissionNews) {
            return response.notFoundError(res, "Admission News not found.");
        }

        admissionNews.title = title || admissionNews.title;
        admissionNews.description = description || admissionNews.description;

        const updatedAdmissionNews = await admissionNews.save();
        if (!updatedAdmissionNews) {
            return response.internalServerError(res, "Failed to update Admission News.");
        }

        response.successResponse(res, updatedAdmissionNews, "Admission News updated successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});



module.exports.deleteAdmissionNews = asyncHandler(async (req, res) => {
    try {
        const admissionNews = await AdmissionNews.findByIdAndDelete(req.params.id);

        if (!admissionNews) {
            return response.notFoundError(res, "Admission News not found.");
        }

        response.successResponse(res, admissionNews, "Admission News deleted successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});



