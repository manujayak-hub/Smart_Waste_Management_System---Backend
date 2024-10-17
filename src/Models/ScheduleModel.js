import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  cdate:{
    type: String,
    required: true,
  },
  area:{
    type:String,
    required:true
  },
  timeslot:{
    type: String,
    required: true,
  },
  jobstatus:{
    type: Boolean,
    default:false,
  },
  type: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  },
  userid: {
    type: String,
    required: true,
  },
  
});


export default mongoose.model('Schedule', scheduleSchema);
