const { body } = require("express-validator");

const registerValidation = [
  body('username').notEmpty().isLength({ min: 5 }).withMessage('UserName is required and must be at least 5 characters long'),
  body('email').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 5 }).withMessage('Password is 5 characters long'),
  
];

module.exports = registerValidation;
