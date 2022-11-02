import cardapio_json from '../../dados/cardapio-caa.json'


export default function cardapio(req, res) {
  try {
  
    res.status(200).json(cardapio_json)

  } catch(err) {
    res.status(400).json({'Error': err})
  }
}
