import { body } from "express-validator";

//post
export const createTaskValidation = [
  body("title")
    .isString().withMessage("title debe ser un string")
    .notEmpty().withMessage("title no puede estar vacío"),
  body('description')
    .isString().withMessage("description debe ser un string")
    .notEmpty().withMessage("description no puede estar vacía"),
  body('isComplete')
    .isBoolean().withMessage("isComplete debe ser un booleano")
    .notEmpty().withMessage("isComplete no puede estar vacío")
];

//put
export const updateTaskValidation = [
  body("title")
    .optional()
    .isString().withMessage("title debe ser un string"),
  body('description')
    .optional()
    .isString().withMessage("description debe ser un string"),
  body('isComplete')
    .optional()
    .isBoolean().withMessage("isComplete debe ser un booleano")
];
