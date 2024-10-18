const Announcement = require('../modal/announcementModal');
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');

module.exports.createAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title) {
      return response.validationError(res, "Title, description, and date are required.");
    }

    const newAnnouncement = new Announcement({ title, description, date });

    const savedAnnouncement = await newAnnouncement.save();
    if (!savedAnnouncement) {
      return response.internalServerError(res, "Unable to save Announcement.");
    }

    response.successResponse(res, savedAnnouncement, "Announcement created successfully.");
  } catch (error) {
    response.internalServerError(res, error.message);
  }
});


module.exports.getAllAnnouncements = asyncHandler(async (req, res) => {
    try {
      const allAnnouncements = await Announcement.find();
      if (!allAnnouncements || allAnnouncements.length === 0) {
        return response.notFoundError(res, "No Announcements found.");
      }
  
      response.successResponse(res, allAnnouncements, "Announcements retrieved successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });


  module.exports.getSingleAnnouncement = asyncHandler(async (req, res) => {
    try {
      const announcement = await Announcement.findById(req.params.id);
      if (!announcement) {
        return response.notFoundError(res, "Announcement not found.");
      }
  
      response.successResponse(res, announcement, "Announcement retrieved successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });

  
  module.exports.updateAnnouncement = asyncHandler(async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const announcement = await Announcement.findById(req.params.id);
      
      if (!announcement) {
        return response.notFoundError(res, "Announcement not found.");
      }
  
      announcement.title = title || announcement.title;
      announcement.description = description || announcement.description;
      announcement.date = date || announcement.date;
  
      const updatedAnnouncement = await announcement.save();
      if (!updatedAnnouncement) {
        return response.internalServerError(res, "Failed to update Announcement.");
      }
  
      response.successResponse(res, updatedAnnouncement, "Announcement updated successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });
  

  module.exports.deleteAnnouncement = asyncHandler(async (req, res) => {
    try {
      const announcement = await Announcement.findById(req.params.id);
      
      if (!announcement) {
        return response.notFoundError(res, "Announcement not found.");
      }
  
      const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
      if (!deletedAnnouncement) {
        return response.internalServerError(res, "Failed to delete Announcement.");
      }
  
      response.successResponse(res, deletedAnnouncement, "Announcement deleted successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });
  
  


