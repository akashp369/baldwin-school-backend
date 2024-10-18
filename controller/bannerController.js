const Banner = require("../modal/bannerModal");
const response = require("../middleware/responseMiddleware");
const asyncHandler = require("express-async-handler");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../middleware/cloudinary");

module.exports.createBanner = asyncHandler(async (req, res) => {
    try {
        const { title, description, link } = req.body;

        if (!link || !req.file) {
            return response.validationError(res, "All details including image are mandatory.");
        }

        const imageUrl = await uploadOnCloudinary(req.file);
        if (!imageUrl) {
            return response.internalServerError(res, "Image upload failed.");
        }

        const newBanner = new Banner({
            imageUrl,
            title,
            description,
            link
        });

        const savedBanner = await newBanner.save();
        if (!savedBanner) {
            return response.internalServerError(res, "Cannot save the banner.");
        }

        response.successResponse(res, savedBanner, "Banner created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


module.exports.getAllBanners = asyncHandler(async (req, res) => {
    try {
        const banners = await Banner.find();
        response.successResponse(res, banners, "Banners retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


module.exports.getSingleBanner = asyncHandler(async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return response.notFoundError(res, "Banner not found.");
        }
        response.successResponse(res, banner, "Banner retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});


module.exports.updateBanner = asyncHandler(async (req, res) => {
    try {
      const { title, description, link } = req.body;
      const banner = await Banner.findById(req.params.id);
      
      if (!banner) {
        return response.notFoundError(res, "Banner not found.");
      }
  
      // Update fields
      banner.title = title || banner.title;
      banner.description = description || banner.description;
      banner.link = link || banner.link;
  
      // Check if new image file is provided
      if (req.file) {
        // Delete old image from Cloudinary
        await deleteFromCloudinary(banner.imageUrl);
  
        // Upload new image
        const newImageUrl = await uploadOnCloudinary(req.file);
        if (!newImageUrl) {
          return response.internalServerError(res, "Failed to upload new image.");
        }
        banner.imageUrl = newImageUrl;
      }
  
      const updatedBanner = await banner.save();
      if (!updatedBanner) {
        return response.internalServerError(res, "Failed to update banner.");
      }
  
      response.successResponse(res, updatedBanner, "Banner updated successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });


  module.exports.deleteBanner = asyncHandler(async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      
      if (!banner) {
        return response.notFoundError(res, "Banner not found.");
      }
  
      // Delete image from Cloudinary
      await deleteFromCloudinary(banner.imageUrl);
  
      // Delete banner from database
      const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
      if (!deletedBanner) {
        return response.internalServerError(res, "Failed to delete banner.");
      }
  
      response.successResponse(res, deletedBanner, "Banner deleted successfully.");
    } catch (error) {
      response.internalServerError(res, error.message);
    }
  });
  
  


