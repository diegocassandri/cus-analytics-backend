const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	code: Number,
    name: String,
    receitaNF: Number,
    totalQtd: Number,
    totalGeneral: Number,
    totalNF: Number,
    itens: [{
		area: String,
		resource: String,
		quantity: Number,
		value: Number,
		total: Number,
		valueNF: Number,
		percentual: Number,
		quantityCost: Number,
		valueCost: Number,
		totalCost: Number,
		quantityReal: Number,
		valueReal: Number,
		totalReal: Number
	}],
    costQtd: Number,
    totalCost: Number,
    expected_profitability: Number,
    expected_margin: Number,
    real_profitability: Number,
	real_margin: Number,
	totalReal: Number,
	realQtd: Number,
	team: {
		type: String,
		enum: ['Matriz - HCM', 'Matriz - ERP','Pr-i','Sp-i','MG','RS','Não Informado'],
		default: 'Não Informado'
	},
	status: {
		type: String,
		enum: ['Não Iniciado','Em Andamento','Concluído','Cancelado'],
		default: 'Não Iniciado'
	},
	initialDate: Date,
	endDate: Date
});

module.exports = mongoose.model('Project',ProjectSchema);