import mongoose from 'mongoose';
// const ingredientsSchema = new mongoose.Schema({ name: String })
const pottingMixSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    // required: true,
    // default: undefined,
  }],
  description: {
    type: String,
    default: '',
  },
});

export default mongoose.model('pottingMix', pottingMixSchema);
