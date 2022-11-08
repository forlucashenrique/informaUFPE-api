import axios  from "axios"
import cheerio from 'cheerio';

const getEvent = async (id, res)  => {
  const result = {}
  const url = `https://www.ufpe.br/caa/eventoscaa/-/asset_publisher/cYunAGCee7Ce/calendar/id/${id}?   inheritRedirect=false&redirect=https%3A%2F%2Fwww.ufpe.br%2Fcaa%2Feventoscaa%3Fp_p_id%3D101_INSTANCE_cYunAGCee7Ce%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-4%26p_p_col_count%3D1`;
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const divContent = $('.asset-content > div:first-child');
  result.html = `${divContent}`;

  res.json(result);
}

export default function Event(req, res) {
  const {id} = req.query

  try {
    getEvent(id, res);

  } catch(err) {
    res.status(400).json({'Erro': err})
  }
  
}