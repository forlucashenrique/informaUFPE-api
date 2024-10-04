import api from '../../../service/api';
import cheerio from 'cheerio';
import https from 'https';

export default async function Cardapio(req, res){
  try {
    
    const menu = {};
    const result = {}
    const response = await api.get(`/rucaa`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });


    const html = response.data;
    const $ = cheerio.load(html);
    const spansDias = $('.tabs nav span');
  
    let meals = {
      'Seg': {lunch: [], dinner: []},
      'Ter': {lunch: [], dinner: []},
      'Qua': {lunch: [], dinner: []},
      'Qui': {lunch: [], dinner: []},
      'Sex': {lunch: [], dinner: []},
    }


    spansDias.each(function(index, element) {
      let nomeDia = $(this).text().trim().toLowerCase().split(' ')[0];
 

      const section = $(`#t-panel-${index}`);
      const tableMenu = $('table', section);

      const tableLines = $('tr', tableMenu);


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

     
      
      tableLines.each(function(index, element){
        
        if (index < 2) return
        const columns = $('td', element);

        meals[nomeDia] = {
          'lunch': {
            ...meals[nomeDia].lunch,
            [`${$(columns[0]).text().trim()}`]: `${$(columns[1]).text().trim()}`,
          },
          
          'dinner': 
            {
              ...meals[nomeDia].dinner,
              [`${$(columns[0]).text().trim()}`]: `${$(columns[2]).text().trim()}`,
            }
          }
          
        
  
        })
        result[nomeDia] = meals[nomeDia];


    })

  
    menu['meals'] = result;

    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate',
    );

    res.status(200).json(menu);
  
  } catch(err) {
    console.log(err)

    res.status(500).json({error: 'failed to load data'});
  }
  
}