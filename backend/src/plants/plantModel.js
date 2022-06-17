import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  moisture: {
    type: Number,
    required: true,
  },
  water: {
    type: Number,
    required: true,
  },
  light: {
    type: Number,
    required: true,
  },
  petfriendly: {
    type: Boolean,
    default: false,
  },
  edible: {
    type: Boolean,
    default: false,
  },
  easyToCare: {
    type: Boolean,
    default: false,
  },
  care: {
    type: String,
    required: true,
  },
  imageKey: {
    type: String,
  },
});

export default mongoose.model('plant', plantSchema);
