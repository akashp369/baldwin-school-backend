const mongoose = require('mongoose');

const eventsGallerySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String, // Store a single image URL
    required: true,
  },
}, {
  timestamps: true,
});

const EventsGallery = mongoose.model('EventsGallery', eventsGallerySchema);
module.exports = EventsGallery;
