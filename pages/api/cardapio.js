import axios from 'axios';
import cheerio from 'cheerio';


const pegarCardapio = async (res) => {
  const cardapio = {};
  const result = []
  const url = 'https://www.ufpe.br/rucaa';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const navCabecalho = $('.tabs nav');
  const spansDias = navCabecalho.children();

  let id = 0;

  spansDias.each(function(){
    const dia = {}
    const nomeDia = $(this).text().trim().toLowerCase();
    const spanID = $(this).attr('id');
    const section = $(`[aria-labelledby=${spanID}]`);
    const tabelaIngredientes = $('table', section);
    const tabelaSecundaria = $('table', tabelaIngredientes);
    const tabelaTres = $('table', tabelaSecundaria);
    
    let tbody;
    
    if(nomeDia === 'Sexta'){
      tbody = $('tbody', tabelaTres);
    } 
    else if(nomeDia === 'Quarta' || nomeDia === 'Quinta') {
      tbody = $('tbody', tabelaSecundaria);
    }
    else {
      tbody = $('tbody', tabelaIngredientes);
    }

    const tr = $('tr:not(:first-child)', tbody);


    const ingredientesAlmoco = [];
    const ingredientesJantar = [];

    tr.each(function(){
      const almocoColuna = $('td:first-child', this);
      const jantarColuna = $('td:last-child', this);
      const ingredienteAlmoco = $(almocoColuna).text();
      const ingredienteJantar = $(jantarColuna).text();

      ingredientesAlmoco.push(ingredienteAlmoco);
      ingredientesJantar.push(ingredienteJantar);
      
    })
    dia[nomeDia] = {'almoco': ingredientesAlmoco, 'janta': ingredientesJantar}
    result.push({'id': id, ...dia});

    id += 1
    
  })

  cardapio['result'] = result;
  res.status(200).json(cardapio);
}


export default function Cardapio(req, res){
  try {
    
    pegarCardapio(res)
  
  } catch(err) {
    res.status(400).json({'Error': err})
  }
  
}