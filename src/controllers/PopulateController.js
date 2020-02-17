const fs = require('fs');
var path = require('path');
const domain = require('domain').create();
const XLSX = require('xlsx');
const Project = require('../models/Project');

require('dotenv/config');

let projects = [];
let savedProjects = [];
const dirFiles = process.env.DIR_FILES;

const index = async (req,res) => {
    //Lê arquivos do diretório 
    await fs.readdir(dirFiles,async function(error,files){
        projects = [];
        itens = [];
        //Percorre cada um dos arquivos
        files.forEach( (file) =>  {
            if((path.extname(file) === '.xls') || (path.extname(file) === '.xlsx')) {
                const workbook = XLSX.readFile(`${dirFiles}/${file}`);
                var sheet_name_list = workbook.SheetNames;
                var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw : true});
                
                itens = [];
                qtdItens = 0;

                //Monta cabeçaçho do projeto
                const project = {
                    code: xlData[1].__EMPTY_2,
                    name: xlData[0].__EMPTY_2,
                    receitaNF: xlData[3].__EMPTY_6,    
                };  

                //Monta Itens itens do projeto
                for(let i = 5; i <= 10; i++){
                    if(xlData[i].__EMPTY_1 === 'TOTAL') {
                        break;
                    } else {
                        itens.push({
                            area: xlData[i].__EMPTY_1,
                            resource:  xlData[i].__EMPTY_2,
                            quantity: xlData[i].__EMPTY_3,
                            value: xlData[i].__EMPTY_4,
                            total: xlData[i].__EMPTY_5,
                            valueNF: xlData[i].__EMPTY_6,
                            percentual: xlData[i].__EMPTY_7,
                            quantityCost: xlData[i].__EMPTY_8,
                            valueCost: xlData[i].__EMPTY_9,
                            totalCost: xlData[i].__EMPTY_10,

                        });
                    }
                    qtdItens = i;
                }

                //Monta totalização do projeto
                project.totalQtd = xlData[qtdItens + 1].__EMPTY_3;
                project.totalGeneral = xlData[qtdItens + 1].__EMPTY_5;
                project.totalNF = xlData[qtdItens + 1].__EMPTY_6;
                project.costQtd = xlData[qtdItens + 1].__EMPTY_8;
                project.totalCost = xlData[qtdItens + 1].__EMPTY_10;
                project.expected_profitability = xlData[qtdItens + 2].__EMPTY_10;
                project.expected_margin = xlData[qtdItens + 3].__EMPTY_10;
                
                //Adiciona objeto itens ao projeto
                project.itens = itens;

                //Adiciona na lista
                projects.push(project);
            }
            
        });

        //Salva projetos no banco de dados
        savedProjects = await saveProjects(projects);
        
        return res.json(savedProjects);
    });
    
    domain.on('error',function(error){
        console.log('Erro ao ler Arquivos', error);
    });
}


const saveProjects = async (projects) => {
    savedProjects = [];

    for (const [idx, project] of projects.entries()) {
        let { code } = project;
        let projectDB = [];

        //Verifica se o o projeto ja existe no DB
        projectDB = await Project.find({ code });

        if(Object.keys(projectDB).length === 0) {
            try {
                const projectSaved = await Project.create(project);
                savedProjects.push(projectSaved);
            } catch (error) {
                console.log(error);
            }
        } 
    }
    
    return savedProjects;
}

module.exports = {
    index
};
