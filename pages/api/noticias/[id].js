import axios  from "axios"
import cheerio from 'cheerio';

const getNews = async (id, res)  => {
  const result = {}
  const url = `https://www.ufpe.br/caa/noticias-do-caa/-/asset_publisher/8TgQ0vpyChuQ/content/id/${id}`;
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const divContent = $('.full-content__full-content');
  result.html = `${divContent}`;

  res.json(result);
}

export default function News(req, res) {
  const {id} = req.query
  
  getNews(id, res);
}