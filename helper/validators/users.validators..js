const Joi = require('@hapi/joi')

const signupSchema = Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    email: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(62).required()
})

const loginSchema = Joi.object().keys({
    email: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(62).required()
})

exports.signupValidator = (req,res, next) => {
    const {error} = signupSchema.validate(req.body);
    if(error) return res.send({
        success: false,
        statu: 400,
        message: error.details[0].message
    }).status(400)

    next();
}

exports.loginValidator = (req,res,next) => {
    const {error} = loginSchema.validate(req.body);
    if(error) return res.send({
        success: false,
        statu: 400,
        message: error.details[0].message
    }).status(400)

    next();
}
// module.exports = signupValidator;