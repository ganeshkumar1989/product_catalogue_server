import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true, index: true},
    quantity: Number,
    expiryDate: Date
});

export default mongoose.model('Product', Schema);