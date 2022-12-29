const mongoose = require('mongoose');

const {Schema} = mongoose;

const book = new Schema({
    name:{
        type:String,
        required:true,
    },
    authorID:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model('Book', book);