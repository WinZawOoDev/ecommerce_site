const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { typeStr, typeNumb, typeDeci, typeObj } = require('./plugins/schema.types')

const itemSchema = mongoose.Schema(
    {
        name: typeStr,
        brand: typeStr,
        description: typeStr,
        price: typeDeci,
        qa: typeStr,
        rating: typeNumb,
        images: {
            type: [typeObj({ name: typeStr, src: typeStr, view: Boolean })],
            required: true
        },
        details: {
            features: {
                type: [typeObj({ name: typeStr, value: typeStr })],
                required: true
            },
            desc: {
                type: [String],
                required: true
            }
        },
        reviews: {
            type: [typeObj({ user: typeStr, rating: typeNumb, date: Date, desc: typeStr })],
            required: true
        }
    },
    { toJSON: { getters: true } }
);

itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;