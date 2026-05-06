import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a boat title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    enum: ['Luxury', 'Fishing', 'Speed Boat', 'Family', 'Adventure'],
    required: [true, 'Please select a category'],
  },
  type: {
    type: String,
    enum: ['rent', 'sale'],
    required: [true, 'Please select type (rent or sale)'],
  },
  pricePerHour: {
    type: Number,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  discountStartDate: {
    type: Date,
    default: null,
  },
  discountEndDate: {
    type: Date,
    default: null,
  },
  images: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Boat = mongoose.models.Boat || mongoose.model('Boat', boatSchema);
