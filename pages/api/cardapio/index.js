import axios from 'axios';
import cheerio from 'cheerio';


const getMenu = async (res) => {
  const cardapio = {};
  const result = {}
  const url = 'https://www.ufpe.br/rucaa';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const spansDias = $('.tabs nav span');
  // const spansDias = navCabecalho.children();

  spansDias.each(function(){
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
    else if (nomeDia === 'Quarta' || nomeDia === 'Quinta') {
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
      const ingredienteAlmoco = $(almocoColuna).text().trim();
      const ingredienteJantar = $(jantarColuna).text().trim();

      ingredientesAlmoco.push(ingredienteAlmoco);
      ingredientesJantar.push(ingredienteJantar);
      
    })
    
    result[nomeDia] =  {'almoco': ingredientesAlmoco, 'janta': ingredientesJantar};

  })

  cardapio['result'] = result;
  res.status(200).json(cardapio);
}


export default function Cardapio(req, res){
  try {
    
    getMenu(res)
  
  } catch(err) {
    res.status(400).json({'Error': err})
  }
  
}