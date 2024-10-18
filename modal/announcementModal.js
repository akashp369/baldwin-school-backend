const mongoose = require('mongoose');

// Announcement Schema
const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  date: {
    type: Date,
    // required: true, // Date of the announcement
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
