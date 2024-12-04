const mongoose = require('mongoose');

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
    required: true,
  },
  image: {
    type: String, // Store image path or URL
    required: true, // Ensure image is mandatory
  },
}, {
  timestamps: true,
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
