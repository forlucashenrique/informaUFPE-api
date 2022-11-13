import api from '../../../service/api';
import cheerio from 'cheerio';

export default async function Article(req, res) {
  const {id} = req.query

  try {
    const result = {}
    const response = await api.get(`/agencia/artigos/-/asset_publisher/560IJ2hfNESM/content/id/${id}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const divContent = $('.full-content__full-content');
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