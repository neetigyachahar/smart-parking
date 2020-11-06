const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slotSchema = new Schema({
    circleName: {
        type: String,
        required: true
    },
    circleXCord: {
        type: String,
        required: true
    },
    circleYCord: {
        type: String,
        required: true
    },
    slotName: {
        type: String,
        required: true
    },
    slotXCord: {
        type: String,
        required: true
    },
    slotYCord: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
});



module.exports = mongoose.model('Slot', slotSchema);
