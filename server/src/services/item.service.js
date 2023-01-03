const httpStatus = require("http-status")
const { Item } = require("../models")
const ApiError = require('../utils/ApiError')

/**
 * Create Item
 * @param {Object} itemBody
 * @returns {Promise<Item>}
 */

const createItem = async (itemBody) => Item.create(itemBody)

/**
 * Query for user
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query Options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryItem = async (filter, options) => {
    const items = await Item.paginate(filter, options);
    return items;
}


/**
 * Get item by id
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
const getItemById = async (id) =>  Item.findById(id);


module.exports = { createItem, queryItem, getItemById }