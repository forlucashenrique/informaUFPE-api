import api from '../../../service/api';
import cheerio from 'cheerio';


export default async function ListEvents(req, res) {
  try {
    const events = {};
    const result = [];
    const response = await api.get('/caa/eventoscaa');
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
    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate'
    );
    res.status(200).json(events)

  } catch(err) {

    console.log(err)
    res.status(500).json({error: 'failed to load data'});
  }

}