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
    required: true,
  },
  edible: {
    type: Boolean,
    required: true,
  },
  easyToCare: {
    type: Boolean,
    required: true,
  },
  care: {
    type: String,
    // required: true,
  },
});

export default mongoose.model('plant', plantSchema);
