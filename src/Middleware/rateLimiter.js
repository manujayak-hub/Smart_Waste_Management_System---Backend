// src/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

export const wasteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,    // Return rate limit info in headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
});
