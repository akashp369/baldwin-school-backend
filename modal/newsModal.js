const mongoose = require('mongoose');

// Admission News Schema
const admissionNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const AdmissionNews = mongoose.model('AdmissionNews', admissionNewsSchema);

module.exports = AdmissionNews;
