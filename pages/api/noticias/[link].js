export default function noticia(req, res) {
  const {link} = req.query

  res.json(link)
}