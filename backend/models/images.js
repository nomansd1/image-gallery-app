var mongoose = require('mongoose');
var Upload = new mongoose.Schema({
    images: {
        type: [
            {
                image: {
                    type: String,
                    required: true,
                },
                originalname: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    tags: {
        type: category,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = new mongoose.model('upload', Upload);
