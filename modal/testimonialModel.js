const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5, 
    },
    avatar: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
