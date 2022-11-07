import axios from 'axios';
import cheerio from 'cheerio';

const pegarOportunidades = async (res) => {
  const oportunidades = {}
  const result = []
  const url = 'https://www.ufpe.br/agencia/noticias/oportunidades/-/asset_publisher/VQX2pzmP0mP4/rss';
  const response = await axios.get(url);
  const xml = response.data;
  const $ = cheerio.load(xml);
  const entryTags = $('entry');

  let id = 0;

  entryTags.each(function() {
    const titulo = $('title', this).html();
    const linkHref = $('link', this).attr('href');
    const author = $('name', this).html();
    const updated = $('updated', this).html();
    const published = $('published', this).html();
    const sumary = $('summary', this).html();
    

    result.push({
      'id': id,
      'titulo': titulo,
      'link': linkHref,
      'sumary': sumary,
      'author': author,
      'updated': updated,
      'published': published
    })

    id += 1;
  })

  oportunidades['result'] = result;

  res.status(200).json(oportunidades);
}

export default function Oportunidades(req, res){
  try {
    pegarOportunidades(res)
  } catch (err) {
    res.status(400).json({'Error': err})
  }
};