const mongoose = require('mongoose');

const coCurricularGallerySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Linking to custom category model
    required: true,
  },
  image: {
    type: String, // Store a single image URL
    required: true,
  },
}, {
  timestamps: true,
});

const CoCurricularGallery = mongoose.model('CoCurricularGallery', coCurricularGallerySchema);
module.exports = CoCurricularGallery;
