import axios from 'axios';
import cheerio from 'cheerio';
import { salvarCardapio } from '../../scrappingUtils/utils';


export default function scrappingCardapio(req, res){
  const cardapio = {};
  const result = []
  const url = 'https://www.ufpe.br/rucaa';
  axios.get(url)
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);
      const navCabecalho = $('.tabs nav');
      const spansDias = navCabecalho.children();
    
      spansDias.each(function(){
        const nomeDia = $(this).text().trim();
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
        
        result.push({'dia': nomeDia, 'refeicoes': {'almoco': ingredientesAlmoco, 'janta': ingredientesJantar}});
        
      })
      
      cardapio['result'] = result;

      return cardapio;
  })
  .then(data => {
    const cardapio = JSON.stringify(data);
    salvarCardapio(cardapio);
  
  })
  .catch(err => {
    console.log(err)
  });

  res.statusCode = 200;
  res.json({})
}