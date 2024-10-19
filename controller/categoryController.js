const Category = require('../modal/categoryModel');
const response = require('../middleware/responseMiddleware');
const asyncHandler = require('express-async-handler');

// Create a new category
module.exports.createCategory = asyncHandler(async (req, res) => {
    try {
        const { name, galleryType } = req.body;

        // Validate the input
        if (!name || !galleryType) {
            return response.validationError(res, "Name and gallery type are required.");
        }

        // Create a new Category object
        const newCategory = new Category({ name, galleryType });

        // Save the category to the database
        const savedCategory = await newCategory.save();
        if (!savedCategory) {
            return response.internalServerError(res, "Unable to save Category.");
        }

        // Return success response
        response.successResponse(res, savedCategory, "Category created successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get all categories
module.exports.getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        response.successResponse(res, categories, "Categories retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Get a single category by ID
module.exports.getSingleCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return response.notFoundError(res, "Category not found.");
        }

        response.successResponse(res, category, "Category retrieved successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Update an existing category by ID
module.exports.updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name, galleryType } = req.body;
        const category = await Category.findById(req.params.id);

        if (!category) {
            return response.notFoundError(res, "Category not found.");
        }

        // Update the category fields if provided
        category.name = name || category.name;
        category.galleryType = galleryType || category.galleryType;

        // Save the updated category
        const updatedCategory = await category.save();
        if (!updatedCategory) {
            return response.internalServerError(res, "Failed to update Category.");
        }

        response.successResponse(res, updatedCategory, "Category updated successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

// Delete a category by ID
module.exports.deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return response.notFoundError(res, "Category not found.");
        }

        response.successResponse(res, category, "Category deleted successfully.");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});
