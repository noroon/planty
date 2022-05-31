import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Number,
    default: Date.now(),
  },
});

export default mongoose.model('article', articleSchema);
