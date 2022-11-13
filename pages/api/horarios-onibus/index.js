import horario_onibus from '../../../service/dados/horario-onibus.json'


export default function BusTime(req, res){
  try {
    res.status(200).json(horario_onibus)
  } catch(err) {
    res.status(500).json({error: 'failed to load data'});
  }
}