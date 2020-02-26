const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	code: {
		type: Number,
		required: true
	},
    name: {
		type: String,
		required: true
	},
    receitaNF: Number,
    totalQtd: Number,
    totalGeneral: Number,
    totalNF: Number,
    itens: [{
		area : { 
			type: mongoose.Schema.Types.ObjectId,
			ref : 'Area'
		},	
		resource: { 
			type: mongoose.Schema.Types.ObjectId,
			ref : 'Resource'
		},
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
	endDate: Date,
	fcaFactor: String,
	fcaCause: String,
	fcaAction: String
});

module.exports = mongoose.model('Project',ProjectSchema);

