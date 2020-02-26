const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Area',AreaSchema);

/**
 * @swagger
 *  components:
 *    schemas:
 *      Area:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *        example:
 *           name: FAB - Analise de Sistemas
 */