const Project = require('../models/Project');


const create = async (req,res) => {
    let project;

    try {
        project = await Project.create(req.body);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao criar Projeto'
        })
    }
    return res.json(project);
}

const findAll = async (req,res) => {
    let filter = req.query;


    if(filter.name){
        filter.name = {
             $regex: '.*' + filter.name + '.*',$options: 'i'
        }
    }

    if(filter.team){
        filter.team = {
             $regex: '.*' + filter.team + '.*',$options: 'i'
        }
    }

    if(filter.status){
        filter.status = {
             $regex: '.*' + filter.status + '.*',$options: 'i'
        }
    }

    if(filter.initialDate) {
        filter.initialDate = {
            $gte: new Date(filter.initialDate)
        }
    }

    if(filter.endDate) {
        filter.endDate = {
            $lte: new Date(new Date(filter.endDate).setHours(23, 59, 59))
        }
    }

        Project.find(filter)
        .then(projects => {
            return res.send(projects);
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message || "Erro ao buscar Projetos."
            });
        });
      
}


const findById = async (req,res) => {
    Project.findById(req.params.id)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Projeto não encontrado Id: " + req.params.id
            });            
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Projeto não encontrado Id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Erro ao buscar projeto Id: " + req.params.id
        });
    });
}



const update = async (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Projeto não encontrado Id: " + req.params.id
            });
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Projeto não encontrado Id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Erro ao atualizar projeto Id: " + req.params.id
        });
    });
};

const destroy = async (req, res) => {
    Project.findByIdAndRemove(req.params.id)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Projeto não encontrado Id: " + req.params.id
            });
        }
        res.send({message: "Projeto Excluido com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Projeto não encontrado Id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar o projeto Id: " + req.params.id
        });
    });
};


module.exports = {
    create,
    findAll,
    findById,
    update,
    destroy
}





