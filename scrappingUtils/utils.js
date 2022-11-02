import fs from 'fs';

export function salvarArtigos(dados){
  // salva os artigos no arquivo '../dados/artigos.json'
  fs.writeFile('../dados/artigos.json', dados, function (err) {
    if (err) throw err;
    console.log('Artigos Saved!');
  });
}

export function salvarOportunidades(dados){
  // salva as oportunidades no arquivo '../dados/oportunidades.json'
  fs.writeFile('../dados/oportunidades.json', dados, function (err) {
    if (err) throw err;
    console.log('Oportunidades Saved!');
  });
}

export function salvarCardapio(dados){
  // salva o cardapio no arquivo '../dados/cardapio-caa.json'
  fs.writeFile('../dados/cardapio-caa.json', dados, function (err) {
    if (err) throw err;
    console.log('Cardapio Saved!');
  });
}

export function salvarNoticias(dados){
  // salva as noticias gerais no arquivo '../dados/noticias.json'
  fs.writeFile('../dados/noticias.json', dados, function (err) {
    if (err) throw err;
    console.log('Noticias Saved!');
  });
}

export function salvarNoticiasCampus(dados) {
  // salva as noticias do campus no arquivo ../dados/noticias.json'
  fs.writeFile('../dados/noticias-campus.json', dados, function (err) {
    if (err) throw err;
    console.log('Noticias campus Saved!');
  });
}

