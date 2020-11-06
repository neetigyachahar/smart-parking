const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    slotName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Booking', bookingSchema);