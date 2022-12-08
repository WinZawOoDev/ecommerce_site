const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const itemValidation = require('../../validations/item.validaton');
const itemController = require('../../controllers/item.controller');

const router = express.Router();

router
    .route('/')
    .post(validate(itemValidation.createItem), itemController.createItem)
    .get(validate(itemValidation.getItems), itemController.getItems);

router
    .route('/:itemId')
    .get(validate(itemValidation.getItem), itemController.getItem);


module.exports = router;