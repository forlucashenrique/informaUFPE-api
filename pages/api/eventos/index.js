import axios from 'axios';
import cheerio from 'cheerio';


const getEvents = async (res) => {
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
      const linkSplitedOne = linkEvent.split('?')
      const linkSplitedTwo = linkSplitedOne[0].split('/')

      result.push({
        'id': id,
        'title': titleEvent,
        'idEvent': linkSplitedTwo[linkSplitedTwo.length - 1],
        'locale': localeEvent,
        'createdAt': createdEventAt,
      })
      id += 1
    }
  })

  events['result'] = result

  res.status(200).json(events)
}

export default function ListEvents(req, res) {
  try {
    getEvents(res)

  } catch(err) {
    res.status(400).json({'Error': err })
  }

}