const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { typeStr, typeBool, typeObj, typeArr } = require('./plugins/schema.types')

const mainCategorySchema = mongoose.Schema(
    {
        name: typeStr,
        unavailable: typeBool,
        sub_cat: typeArr(typeObj({ name: typeStr, slug: typeStr, products: typeArr(typeStr) }))
    },
    { toJSON: { getters: true } }
);

mainCategorySchema.plugin(toJSON);

const mainCategory = mongoose.model('mainCategory', mainCategorySchema);
module.exports = mainCategory;