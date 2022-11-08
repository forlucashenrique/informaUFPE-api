import axios from "axios";
import cheerio from 'cheerio';

const getNews = async (res) => {
  const noticias = {}
  const result = []
  const url = 'https://www.ufpe.br/caa/noticias-do-caa/-/asset_publisher/8TgQ0vpyChuQ/rss?p_p_cacheability=cacheLevelFull';
  const response = await axios.get(url);
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
  res.status(200).json(noticias);
}

export default function ListNews(req, res) {
  try {
    getNews(res)
  } catch (err) {
    res.status(400).json({'Error': err});
  }
}