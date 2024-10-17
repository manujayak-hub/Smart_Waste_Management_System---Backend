import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  emailAddress: { 
    type: String, 
    required: true
 },
  contactNumber: { 
    type: String, 
    required: true 
},
  area: { 
    type: String, 
    required: true 
},
  feedbackType: { 
    type: String, 
    required: true 
},
  message: { 
    type: String, 
    required: true 
},
  date: { 
    type: Date, 
    default: Date.now 
},
userId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User' 
},
  response: { 
    type: String, 
    default: null 
},
userId: {
  type: String,
  required: true,
},

});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;


