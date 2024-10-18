const mongoose = require('mongoose');

// Success Story Schema
const successStorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // Store image URL (uploaded via Cloudinary or another service)
    trim: true,
  },
  headline: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const SuccessStory = mongoose.model('SuccessStory', successStorySchema);

module.exports = SuccessStory;
