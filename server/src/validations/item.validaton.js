const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createItem = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        brand: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        qa: Joi.string().required(),
        rating: Joi.number().max(150).required(),
        images: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            src: Joi.string().required(),
            view: Joi.boolean().required()
        })).required(),
        details: Joi.object({
            features: Joi.array().items(Joi.object({
                name: Joi.string().required(),
                value: Joi.string().required(),
            })).required(),
            desc: Joi.array().items(Joi.string().required()).required()
        }).required(),
        reviews: Joi.array().items(Joi.object({
            user: Joi.string().required(),
            rating: Joi.number().required(),
            date: Joi.date().required(),
            desc: Joi.string().required()
        })).required()
    })
}


const getItems = {
    query: Joi.object().keys({
        name: Joi.string(),
        brand: Joi.string(),
        category: Joi.string(),
        price: Joi.number().integer().precision(2),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
}


const getItem = {
    params: Joi.object().keys({
        itemId: Joi.string().custom(objectId)
    })
}


module.exports = {
    createItem,
    getItems,
    getItem
}