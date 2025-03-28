const Joi = require('joi');

module.exports.cateringSchema = Joi.object({
    catering: Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image: Joi.string().allow("", null),
        location : Joi.string().required()
    }).required()
})

module.exports.menuSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0)
})