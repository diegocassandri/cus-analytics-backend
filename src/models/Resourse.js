const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
    },
    valueCost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Resource',ResourceSchema);