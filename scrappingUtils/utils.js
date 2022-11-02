import fs from 'fs';
import path from 'path'


const currentDirectory = path.join(process.cwd(), 'dados/')
const fileNames = fs.readdirSync(currentDirectory)

export function salvarArtigos(dados){
  // salva os artigos no arquivo '../dados/artigos.json'
  fs.writeFile(`${currentDirectory}${fileNames[0]}`, dados, function (err) {
    if (err) throw err;
    console.log('Artigos Saved!');
  });
}

export function salvarOportunidades(dados){
  // salva as oportunidades no arquivo '../dados/oportunidades.json'
  fs.writeFile(`${currentDirectory}${fileNames[5]}`, dados, function (err) {
    if (err) throw err;
    console.log('Oportunidades Saved!');
  });

}

export function salvarCardapio(dados){
  // salva o cardapio no arquivo '../dados/cardapio-caa.json'
  fs.writeFile(`${currentDirectory}${fileNames[1]}`, dados, function (err) {
    if (err) throw err;
    console.log('Cardapio Saved!');
  });
  
}

export function salvarNoticias(dados){
  // salva as noticias gerais no arquivo '../dados/noticias.json'
  fs.writeFile(`${currentDirectory}${fileNames[4]}`, dados, function (err) {
    if (err) throw err;
    console.log('Noticias Saved!');
  });
}

export function salvarNoticiasCampus(dados) {
  // salva as noticias do campus no arquivo ../dados/noticias.json'
  fs.writeFile(`${currentDirectory}${fileNames[3]}`, dados, function (err) {
    if (err) throw err;
    console.log('Noticias campus Saved!');
  });
}

