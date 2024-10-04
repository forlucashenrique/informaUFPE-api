import api from '../../../service/api';
import cheerio from 'cheerio';
import https from 'https';




function formattedMarkedDates(event) {
  const date = event.createdAt.split(' ')[0]

  const markedDate = {
      [date]: {
          marked: true,
          dotColor: '#262D33',
          dots: [{
              key: 'meeting',
              color: '#262D33',
          }]
      }
  }

  return markedDate
}

export default async function ListEvents(req, res) {

  function formatDate(dateTime) {
    const dateTimeSplited = dateTime.split(' ')
    const dateSplited = dateTimeSplited[0].split('/')
    const markedDates = {}


    return `${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]} ${dateTimeSplited[1]}`

  }

  try {
    const events = {};
    const result = [];
    const response = await api.get('/caa/eventoscaa', {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const divListEvents = $('.list-events');
    const listEvents = $('ul', divListEvents);
    const itensEvents = listEvents.children();

    let id = 0;

    itensEvents.each(function(){
      const createdEventAt = $('time', this).attr('datetime'); 

      const linkEvent = $('a', this).attr('href');
      const titleEvent = $('h4', this).text().trim();
      const localeEvent = $('p', this).text().trim();

    

      if(titleEvent){
        const linkSplitedOne = linkEvent.split('?')
        const linkSplitedTwo = linkSplitedOne[0].split('/')

        result.push({
          'id': id,
          'title': titleEvent,
          'idEvent': linkSplitedTwo[linkSplitedTwo.length - 1],
          'locale': localeEvent,
          'link': linkEvent,
          'createdAt': formatDate(createdEventAt),
        })
        
        id += 1
      }
    })

    events['result'] = result
    events['markedDates'] = {}

    events.result.forEach(event => {
      const date = event.createdAt.split(' ')[0]
      const markedDate = {
          [date]: {
              marked: true,
              dotColor: '#0B3472',
              dots: [{
                  key: 'meeting',
                  color: '#0B3472',
              }]
          }
      }

      events.markedDates = {...events.markedDates, ...markedDate}
    })

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