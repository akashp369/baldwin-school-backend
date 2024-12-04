const Announcement = require('../modal/announcementModal');
const response = require('../middleware/responseMiddleware');
const { uploadOnCloudinary } = require('../middleware/cloudinary');
const asyncHandler = require('express-async-handler');

// Create Announcement
module.exports.createAnnouncement = asyncHandler(async (req, res) => {
    try {
        const { title, description, date } = req.body;

        // Check if required fields are provided
        if (!title || !description || !req.file) {
            return response.validationError(res, "Title, description, and image are required.");
        }

        // Upload image to Cloudinary
        const imageUrl = await uploadOnCloudinary(req.file);
        if (!imageUrl) {
            return response.internalServerError(res, "Image upload failed.");
        }

        // Create the new announcement
        const newAnnouncement = new Announcement({
            title,
            description,
            date,
            image: imageUrl, // Store the image URL
        });

        const savedAnnouncement = await newAnnouncement.save();
        if (!savedAnnouncement) {
            return response.internalServerError(res, "Unable to save the announcement.");
        }

        // Return success response
        response.successResponse(res, savedAnnouncement, "Announcement created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Update Announcement
module.exports.updateAnnouncement = asyncHandler(async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const announcement = await Announcement.findById(req.params.id);

        // Check if announcement exists
        if (!announcement) {
            return response.notFoundError(res, "Announcement not found.");
        }

        // Check if image is provided and upload it
        if (req.file) {
            const imageUrl = await uploadOnCloudinary(req.file);
            if (!imageUrl) {
                return response.internalServerError(res, "Image upload failed.");
            }
            announcement.image = imageUrl; // Update the image URL if a new image is provided
        }

        // Update other fields
        announcement.title = title || announcement.title;
        announcement.description = description || announcement.description;
        announcement.date = date || announcement.date;

        const updatedAnnouncement = await announcement.save();
        if (!updatedAnnouncement) {
            return response.internalServerError(res, "Failed to update the announcement.");
        }

        response.successResponse(res, updatedAnnouncement, "Announcement updated successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


module.exports.getAllAnnouncements = asyncHandler(async (req, res) => {
    try {
      const allAnnouncements = await Announcement.find();
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
  
  


