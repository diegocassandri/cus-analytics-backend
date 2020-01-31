const fs = require('fs');
var domain = require('domain').create();
const XLSX = require('xlsx');

let projects = [];

const index = async (req,res) => {
    
    //Lê arquivos do diretório 
    fs.readdir(`.././projetos`,function(error,files){
        projects = [];
        //Percorre cada um dos arquivos
        files.forEach((file) =>  {
             
            const workbook = XLSX.readFile(`.././projetos/${file}`);
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw : false});

            //Monta objeto de projetos
            const project = {
                code: xlData[1].__EMPTY_2,
                name: xlData[0].__EMPTY_2
            };

            //Adiciona na lista
            projects.push(project);
        });
        return res.json(projects);
    });
    
    domain.on("error",function(error){
        console.log('Erro ao ler Arquivos', error);
    });
}

const indexOne = async (req,res) => {
    const projectId = req.params.id;

    return res.json(await populeProjects());
}

const populeProjects = async () => {
    //Lê arquivos do diretório 
    fs.readdir(`.././projetos`,function(error,files){
        var data = [];
        //Percorre cada um dos arquivos
        files.forEach((file) =>  {
             
            const workbook = XLSX.readFile(`.././projetos/${file}`);
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw : false});

            //Monta objeto de projetos
            const project = {
                code: xlData[1].__EMPTY_2,
                name: xlData[0].__EMPTY_2
            };

            //Adiciona na lista
            data.push(project);
        });
        console.log(data);
        return data;
    });
    
    domain.on("error",function(error){
        console.log('Erro ao ler Arquivos', error);
    });
}

module.exports = {
    index,
    indexOne
}





