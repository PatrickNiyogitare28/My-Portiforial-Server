const Joi = require('@hapi/joi');

const createBlogSchema = Joi.object().keys({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(3).required()
})

exports.createBlogValidator = (req,res,next) => {
    const {error} = createBlogSchema.validate(req.body);
    if(error) return res.send({
        success: false,
        status: 400,
        message: error.details[0].message
    }).status(400)

    next();
}