import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  boatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boat',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide a booking date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide a time'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide duration in hours'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide total price'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
