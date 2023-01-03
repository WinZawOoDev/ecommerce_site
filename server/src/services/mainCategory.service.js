const httpStatus = require('http-status');
const { mainCategory } = require('../models')
const ApiError = require('../utils/ApiError');

/**
 * Query Category
 * @param {Object} filter - Mongo filter
 * @param {Object} Options - Query Options
 * @param {String} [options.sortBy] - Sort option in the format: fortField: (desc | asc)
 * @return {Promise<QueryResult>}
 */
const queryCategory = async (filter, options) => {
    const category = await mainCategory.find(filter);
    return category;
}


/**
 * Create category
 * @param {Object} categoryBody
 * @return {Promise<mainCategory>}
 */
const createCategory = async (categoryBody) => mainCategory.create(categoryBody);



module.exports = { queryCategory, createCategory }