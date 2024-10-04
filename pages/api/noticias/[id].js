import api from '../../../service/api';
import cheerio from 'cheerio';
import https from 'https';

export default async function News(req, res) {
  const {id} = req.query
  
  try {
    const result = {}
    const response = await api.get(`/caa/noticias-do-caa/-/asset_publisher/8TgQ0vpyChuQ/content/id/${id}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const divContent = $('.full-content__full-content')
    result.html = `${divContent}`;

   

    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate'
    );



    res.status(200).json(result);

    

  } catch(err) {
    res.status(500).json({error: 'failed to load data'});
  }
}