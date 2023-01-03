const mongoose = require('mongoose');
const { toJSON } = require('./index');

const typeBool = { type: Boolean, required: true }
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

const typeArr = (any = undefined) => ({ required: true, type: any ? [any] : [] })


module.exports = { typeBool, typeStr, typeNumb, typeDeci, typeObj, typeArr }