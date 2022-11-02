import axios from "axios";
import cheerio from 'cheerio'

const pegarArtigos = async (res) => {
  const artigos = {}
  const result = []
  const url = 'https://www.ufpe.br/agencia/artigos/-/asset_publisher/560IJ2hfNESM/rss';
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

    result.push({
      'id': id,
      'titulo': titulo,
      'link': linkHref,
      'author': author,
      'updated': updated,
      'published': published
    })

    id += 1;
  })
  

  artigos['result'] = result;

  res.status(200).json(artigos)
 
}

export default function Artigos(req, res) {
  try {
    pegarArtigos(res)
  } catch(err) {
    res.status(400).json({'Error': err})

  }
}