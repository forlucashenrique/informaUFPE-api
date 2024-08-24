import api from '../../../service/api';
import cheerio from 'cheerio';
import https from 'https';

export default async function ListNews(req, res) {
  try {
    const noticias = {}
    const result = []
    const response = await api.get('/caa/noticias-do-caa/-/asset_publisher/8TgQ0vpyChuQ/rss?p_p_cacheability=cacheLevelFull', {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });



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

    
    const firstNewsPhoto = async () => {
      const response = await api.get(`/caa/noticias-do-caa/-/asset_publisher/8TgQ0vpyChuQ/content/id/${result[0].idNews}`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });
      const html = response.data;
      const $ = cheerio.load(html);
      const img = $('.asset-content img').attr('src');

      const imgSplited = img.split('/documents')

      const imgPath = `/documents${imgSplited[1]}`

      return imgPath;
    }

    

    noticias['result'] = result;

    noticias['result'][0].imgPath = await firstNewsPhoto();

    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate'
    );


    res.status(200).json(noticias);

  } catch (err) {

    console.log(err)

    res.status(500).json({error: 'failed to load data'});
  }
}