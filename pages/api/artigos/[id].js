import axios  from "axios"
import cheerio from 'cheerio';

const getArticle = async (id, res)  => {
  const result = {}
  const url = `https://www.ufpe.br/agencia/artigos/-/asset_publisher/560IJ2hfNESM/content/id/${id}`;
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const divContent = $('.full-content__full-content');
  result.html = `${divContent}`;

  res.json(result);
}

export default function Article(req, res) {
  const {id} = req.query

  try {
    getArticle(id, res);

  } catch(err) {
    res.status(400).json({'Erro': err})
  }
  
}