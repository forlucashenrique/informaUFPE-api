import api from '../../../service/api';
import cheerio from 'cheerio';


export default async function Event(req, res) {
  const {id} = req.query

  try {
    const result = {}
    const response = await api.get(`/caa/eventoscaa/-/asset_publisher/cYunAGCee7Ce/calendar/id/${id}?   inheritRedirect=false&redirect=https%3A%2F%2Fwww.ufpe.br%2Fcaa%2Feventoscaa%3Fp_p_id%3D101_INSTANCE_cYunAGCee7Ce%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-4%26p_p_col_count%3D1`);
    const html = response.data;
    const $ = cheerio.load(html);

    const divContent = $('.asset-content > div:first-child');
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