import api from '../../../service/api';
import cheerio from 'cheerio';
import https from 'https';

export default async function Cardapio(req, res){
  try {
    
    const cardapio = {};
    const result = {}
    const response = await api.get(`/rucaa`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });


    const html = response.data;
    const $ = cheerio.load(html);
    const spansDias = $('.tabs nav span');
    
    let menu = {}
  
    let lunch = {
        
    }


    spansDias.each(function() {
      let nomeDia = $(this).text().trim().toLowerCase().split(' ')[0];
      console.log(nomeDia)

      //const spanID = $(this).attr('id');
      // const section = $(`[aria-labelledby=${spanID}]`);

      const section = $('.tabs__content');
      const tableMenu = $('table', section);

      const tableLines = $('tr', tableMenu);

      
      tableLines.each(function(index, element){
        console.log($(element).html())

        if (index < 2) return;

        const columns = $('td', element);

        if (lunch[nomeDia] === undefined) {
          lunch[nomeDia] = []
        } else {
          lunch[nomeDia] = [
            ...lunch[nomeDia],
            {
              [$(columns[0]).text()]: $(columns[1]).text(),
            }
          ]
        }



        

        // columns.each(function(index, element){
          
        //   if (index === 0) {
        //     lunch = {...lunch, [$(element).text()]: [] }
        //   }


        // })


        
        // console.log(nomeDia)
        // console.log('================================')
        // console.log($(element).text())
      })

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

      if (!ingredientesAlmoco[0]) {
        ingredientesAlmoco[0] = 'RU FECHADO'
      }

      if (!ingredientesJantar[0]) {
        ingredientesJantar[0] = 'RU FECHADO'
      }

      switch(nomeDia){
        case 'segunda':
          nomeDia = 'Seg';
          break;
        case 'terça':
          nomeDia = 'Ter';
          break;
        case 'quarta':
          nomeDia = 'Qua';
          break;
        case 'quinta':
          nomeDia = 'Qui';
          break;
        case 'sexta':
          nomeDia = 'Sex';
          break;

        default: 
          break;
      }
      
      
      result[nomeDia] =  {'lunch': ingredientesAlmoco, 'dinner': ingredientesJantar};
  
      console.log(lunch)
    })

  
    cardapio['result'] = result;

    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate',
    
    );

    res.status(200).json(cardapio);
  
  } catch(err) {
    console.log(err)

    res.status(500).json({error: 'failed to load data'});
  }
  
}