import cardapio_json from '../../dados/cardapio-caa.json'
import {scrapCardapio} from '../../scrappingUtils/service'

export default function cardapio(req, res) {
  try {
    scrapCardapio()
    

  } catch(err) {
    res.status(400).json({'Error': err})
  }
}
