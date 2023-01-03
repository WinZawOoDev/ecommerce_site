const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { typeStr, typeArr } = require('./plugins/schema.types')

const productCategorySchema = mongoose.Schema({
    title: { ...typeStr, unique: true },
    data: typeArr(),
});

productCategorySchema.plugin(toJSON);

const productCategory = mongoose.model('productCategory', productCategorySchema);

module.exports = productCategory;