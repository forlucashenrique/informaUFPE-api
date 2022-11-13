import api from '../../../service/api';
import cheerio from 'cheerio';

export default async function ListNews(req, res) {
  try {
    const noticias = {}
    const result = []
    const response = await api.get('/caa/noticias-do-caa/-/asset_publisher/8TgQ0vpyChuQ/rss?p_p_cacheability=cacheLevelFull');
    const xml = response.data;
    const $ = cheerio.load(xml);
    const itemTags = $('item');

    let id = 0;

    itemTags.each(function() {
      const title = $('title', this).html();
      const linkHref = $('guid', this).html();
      const published = $('pubDate', this).html();
      
      const linkSplited = linkHref.split('/');
      const idNews = linkSplited[linkSplited.length - 1]
      result.push({
        "id": id,
        'title': title,
        'idNews': idNews,
        'published': published,
      
      })

      id += 1
    })

    noticias['result'] = result;
    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate'
    );
    res.status(200).json(noticias);

  } catch (err) {
    res.status(500).json({error: 'failed to load data'});
  }
}