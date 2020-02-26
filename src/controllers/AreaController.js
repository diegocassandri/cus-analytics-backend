const Area = require('../models/Area');

const findAll = async(req,res) => {

    let filter = req.query;

    try {
        const areas = await Area.find(filter);

        return res.json(areas);

    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
}

const findById = async(req,res) => {
    let id = req.params.id;
    let area = [];

    try {
        area = await Area.findById(id);

        if(!area){
            return res.status(404).send({
                message: "Área não encontrada Id: " + id
            });   
        }

        return res.json(area);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao buscar Área com id: ' + id
        })
    }
}

const create = async(req,res) => {
    let area;

    try {
        area = await Area.create(req.body);

        return res.json(area);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao criar Área' + ' ' + error
        })
    }
}

const update = async(req,res) => {

    try {
        const area = await Area.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(area);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao atualizar Área' + ' ' + error
        })
    }
}

const destroy = async(req,res) => {

    try {
        await Area.findByIdAndDelete(req.params.id);

        return res.json({message: 'Área exluida com sucesso!'});
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao excluir Área' + ' ' + error
        })
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    destroy
};

