import horario_onibus from '../../../dados/horario-onibus.json'


export default function orarioOnibus(req, res){
  try {
    res.status(200).json(horario_onibus)
  } catch(err) {
    res.status(400).json({'Error': err})
  }
}