import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    token: {type: String, required: true}
});

export default mongoose.model('User', Schema);