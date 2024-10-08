
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    availability: {
        type: Boolean,
    },
    borrowed: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',

    },
    Created_date: {
        type: String,
    },
    Updated_date: {
        type: String,
    },


})

const book = mongoose.model("book", bookSchema);


module.exports = book;