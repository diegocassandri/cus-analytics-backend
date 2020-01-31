const fs = require('fs');
var domain = require('domain').create();
const XLSX = require('xlsx')


const projects = [];

//Lê arquivos do diretório 
fs.readdir('./ projetos',function(error,files){
  //Percorre cada um dos arquivos
  for (file of files) {
    console.log('Lendo Arquivo: ' + file);

    const workbook = XLSX.readFile(`${__dirname}/projetos/${file}`);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw : false});

    //Monta objeto de projetos
    console.log(xlData);

    buildProject(xlData);
  }

});

domain.on("error",function(erros){
   console.log('Erro ao ler Arquivos', erros);
});

const buildProject = (project) => {
    
}

console.log(projects);