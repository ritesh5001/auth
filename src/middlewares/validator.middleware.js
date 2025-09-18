const {body,validationResult} = require('express-validator');

const registerUserValidations = [
    body('username')
    .isString()
    .isLength({min:3})
    .withMessage("Username must be at least 3 Characters long")
]
