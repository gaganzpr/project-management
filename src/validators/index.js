import {body} from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is not valid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({min:3, max:50})
            .withMessage("Username must be between 5 and 50 characters"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullName")
            .optional()
            .trim()
    ]
};

const userLoginValidator = () => {
    return  [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is required"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")

    ];
};

export {userRegisterValidator, userLoginValidator};