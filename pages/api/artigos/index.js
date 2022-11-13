import api from '../../../service/api'
import cheerio from 'cheerio'

export default async function Articles(req, res) {
  try {
    const artigos = {}
    const result = []
    const response = await api.get('/agencia/artigos/-/asset_publisher/560IJ2hfNESM/rss');
    const xml = response.data;
    const $ = cheerio.load(xml);
    const entryTags = $('entry');
    let id = 0;
    entryTags.each(function() {
      const title = $('title', this).html();
      const linkHref = $('link', this).attr('href');
      const author = $('name', this).html();
      const updated = $('updated', this).html();
      const published = $('published', this).html();
      const linkSplited = linkHref.split('/');
      const idArticle = linkSplited[linkSplited.length - 1]
      
      result.push({
        'id': id,
        'title': title,
        'idArticle': idArticle,
        'author': author,
        'updated': updated,
        'published': published
      })

      id += 1;
    })
    

    artigos['result'] = result;
    res.setHeader(
      'Cache-Control',
      's-maxage=86400',
      'stale-while-revalidate'
    );
    res.status(200).json(artigos);

  } catch(err) {
    res.status(500).json({error: 'failed to load data'});

  }
}