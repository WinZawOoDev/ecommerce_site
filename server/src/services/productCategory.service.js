const httpStatus = require('http-status')
const { productCategory } = require('../models')
const ApiError = require('../utils/ApiError')


/**
 * @param {Object} filter 
 * @param {Object} options 
 * @returns 
 */
const queryProductCategory = async (filter, options) => {
    const category = await productCategory.find(filter);
    return category;
}

/**
 * 
 * @param {*} productCategoryBody 
 * @returns 
 */
const createProductCategory = async (productCategoryBody) => productCategory.create(productCategoryBody);


module.exports = { queryProductCategory, createProductCategory };
