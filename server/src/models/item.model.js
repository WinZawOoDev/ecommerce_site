const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const typeStr = { type: String, required: true, trim: true }
const typeNumb = { type: Number, required: true }
const typeDeci = {
    default: 0,
    type: mongoose.Decimal128,
    required: true,
    get: (v) => v.toString()
}
const typeObj = (obj) => {
    const objSchema = mongoose.Schema({ ...obj });
    objSchema.plugin(toJSON);
    return {
        required: true,
        type: objSchema
    };
};


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