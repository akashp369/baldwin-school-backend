const mongoose = require('mongoose');

// News Section Schema
const newsSectionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  heading: {
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

const NewsSection = mongoose.model('NewsSection', newsSectionSchema);

module.exports = NewsSection;
