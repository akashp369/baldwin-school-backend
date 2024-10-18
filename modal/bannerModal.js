const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    trim: true 
  },
  title: {
    type: String,
    required: true,
    trim: true 
  },
  description: {
    type: String,
    trim: true 
  },
  link: {
    type: String,
    required: true,
    trim: true 
  },
  isActive: {
    type: Boolean,
    default: true, 
  }
}, {
  timestamps: true 
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
