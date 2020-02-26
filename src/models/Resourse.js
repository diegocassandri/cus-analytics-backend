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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Resource:
 *        type: object
 *        required:
 *          - name
 *          - valueCost
 *        properties:
 *          name:
 *            type: string
 *          valueCost: 
 *            type: Number 
 *        example:
 *           name: FAB - Analise de Sistemas
 *           valueCosto: 10.00
 */