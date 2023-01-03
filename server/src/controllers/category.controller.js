const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mainCategoryService, productCategoryService } = require('../services');

const getCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name, slug']);
    const options = pick(req.query, ['sortBy']);
    const result = await mainCategoryService.queryCategory(filter, options);
    res.send(result);
});


const createCategory = catchAsync(async (req, res) => {
    const category = await mainCategoryService.createCategory(req.body);
    res.status(httpStatus.CREATED).send(category);
});


const createProductCategory = catchAsync(async (req, res) => {
    const productCategory = await productCategoryService.createProductCategory(req.body);
    res.status(httpStatus.CREATED).send(productCategory);
});


const getProductCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['title, name']);
    const options = pick(req.query, ['sortBy']);
    const result = await productCategoryService.queryProductCategory(filter, options);
    res.send(result);
});

module.exports = { getCategories, createCategory, createProductCategory, getProductCategories }