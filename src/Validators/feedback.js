import { celebrate, Joi, Segments } from 'celebrate';
 

export const createFeedbackSchema = Joi.object({
  userId: Joi.string().optional(),
  emailAddress: Joi.string().email().optional(),
  contactNumber: Joi.string().min(7).max(20).optional(),
  area: Joi.string().max(100).optional(),
  feedbackType: Joi.string().max(100).optional(),
  message: Joi.string().min(5).max(5000).optional(),
});

export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // for mongo ObjectId
});
