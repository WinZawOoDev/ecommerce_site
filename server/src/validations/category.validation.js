const Joi = require('joi');

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        unavailable: Joi.boolean().required(),
        sub_cat: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            slug: Joi.string().required(),
            products: Joi.array().items(Joi.string()).required()
        })).required()
    })
}

const createProductCategory = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        data: Joi.array().required()
    })
}

module.exports = { createCategory, createProductCategory };