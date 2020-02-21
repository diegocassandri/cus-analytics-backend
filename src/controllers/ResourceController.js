const Resourse = require('../models/Resourse');

const findAll = async(req,res) => {

    let filter = req.query;

    try {
        const resourses = await Resourse.find(filter);

        return res.json(resourses);

    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
}

const findById = async(req,res) => {
    let id = req.params.id;
    let resourse = [];

    try {
        resourse = await Resourse.findById(id);

        if(!resourse){
            return res.status(404).send({
                message: "Recurso não encontrado Id: " + id
            });   
        }

        return res.json(resourse);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao buscar recurso com id: ' + id
        })
    }
}

const create = async(req,res) => {
    let resourse;

    try {
        resourse = await Resourse.create(req.body);

        return res.json(resourse);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao criar Recurso' + ' ' + error
        })
    }
}

const update = async(req,res) => {

    try {
        const resourse = await Resourse.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(resourse);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao atualizar Área' + ' ' + error
        })
    }
}

const destroy = async(req,res) => {

    try {
        await Resourse.findByIdAndDelete(req.params.id);

        return res.json({message: 'Recurso exluido com sucesso!'});
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