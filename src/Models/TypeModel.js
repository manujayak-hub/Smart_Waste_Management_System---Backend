import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const typeSchema = new Schema({
  wastetype: {
    type: String,
    required: true,
  },
  typedescription:{
    type:String,
    required:true
  }
});


export default mongoose.model('type', typeSchema);
