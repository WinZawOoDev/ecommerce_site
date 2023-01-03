const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');
const { categoryController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(validate(categoryValidation.createCategory), categoryController.createCategory)
    .get(categoryController.getCategories);


router.route('/product')
    .post(validate(categoryValidation.createProductCategory), categoryController.createProductCategory)
    .get(categoryController.getProductCategories);


module.exports = router;