// Models/FeedbackModel.js
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const feedbackSchema = new mongoose.Schema({
  emailAddress: { 
    type: String, 
    required: true,
    match: /.+@.+\..+/  // basic email format validation
  },
  contactNumber: { 
    type: String, 
    required: true,
    maxlength: 20
  },
  area: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  feedbackType: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  message: { 
    type: String, 
    required: true,
    maxlength: 5000
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  response: { 
    type: String, 
    default: null 
  },
});

// Pre-save hook to sanitize message and area
feedbackSchema.pre('save', function (next) {
  if (this.isModified('message') && this.message) {
    this.message = sanitizeHtml(this.message, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.isModified('area') && this.area) {
    this.area = sanitizeHtml(this.area, { allowedTags: [], allowedAttributes: {} });
  }
  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
