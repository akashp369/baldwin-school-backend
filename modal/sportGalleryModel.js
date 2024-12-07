const mongoose = require('mongoose');

const sportGallerySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Outdoor', 'Indoor'], // Only two possible categories
    required: true,
  },
  image: {
    type: String, // Store a single image URL
    required: true,
  },
  title:{
    type:String,
    default:""
  }
}, {
  timestamps: true, // To track createdAt and updatedAt timestamps
});

const SportGallery = mongoose.model('SportGallery', sportGallerySchema);
module.exports = SportGallery;
