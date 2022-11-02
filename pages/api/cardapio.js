import cardapio from '../../dados/cardapio-caa.json'

export default function pegarCardapio(req, res) {
  try {
    res.status(200).json(cardapio)

  } catch(err) {
    res.status(400).json({'Error': err})
  }
}
