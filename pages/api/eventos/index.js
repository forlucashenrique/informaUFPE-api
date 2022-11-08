import axios from 'axios';
import cheerio from 'cheerio';


const pegarEventos = async (res) => {
  const events = {};
  const result = [];
  const url = 'https://www.ufpe.br/caa/eventoscaa';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const divListEvents = $('.list-events');
  const listEvents = $('ul', divListEvents);
  const itensEvents = listEvents.children();

  let id = 0;
  itensEvents.each(function(){
    const createdEventAt = $('time', this).attr('datetime'); 
    const linkEvent = $('a', this).attr('href');
    const titleEvent = $('h4', this).text();
    const localeEvent = $('p', this).text();
    
    if(titleEvent){
      result.push({
        'id': id,
        'title': titleEvent,
        'linkEvent': linkEvent,
        'locale': localeEvent,
        'createdAt': createdEventAt,

      })
      id += 1
    }
  })

  events['result'] = result

  res.status(200).json(events)
}

export default function Eventos(req, res) {
  try {
    pegarEventos(res)

  } catch(err) {
    res.status(400).json({'Error': err })
  }

}