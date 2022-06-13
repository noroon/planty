import mongoose from 'mongoose';

const plantRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('plantRequest', plantRequestSchema);
