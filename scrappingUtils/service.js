import axios from 'axios';
import cheerio from 'cheerio';
import {salvarArtigos, salvarCardapio, salvarNoticias, salvarNoticiasCampus, salvarOportunidades} from './utils'

export function scrapArtigos(){
  const artigos = {}
  const result = []
  const url = 'https://www.ufpe.br/agencia/artigos/-/asset_publisher/560IJ2hfNESM/rss';
  
  axios.get(url)
    .then(res => {
      const xml = res.data;
      const $ = cheerio.load(xml);
      const entryTags = $('entry');

      entryTags.each(function() {
        const titulo = $('title', this).html();
        const linkHref = $('link', this).attr('href');
        const author = $('name', this).html();
        const updated = $('updated', this).html();
        const published = $('published', this).html();
        

        result.push({
          'titulo': titulo,
          'link': linkHref,
          'author': author,
          'updated': updated,
          'published': published
        })
      })

      artigos['result'] = result;

      return artigos
    })
    .then(data => {
      const artigos = JSON.stringify(data)
      salvarArtigos(artigos)
     
    })
    .catch(err => {
      console.log(err);
    });
}

export function scrapOportunidades(){
  const oportunidades = {}
  const result = []
  const url = 'https://www.ufpe.br/agencia/noticias/oportunidades/-/asset_publisher/VQX2pzmP0mP4/rss';
  axios.get(url)
    .then(res => {
      const xml = res.data;
      const $ = cheerio.load(xml);
      const entryTags = $('entry');

      entryTags.each(function() {
        const titulo = $('title', this).html();
        const linkHref = $('link', this).attr('href');
        const author = $('name', this).html();
        const updated = $('updated', this).html();
        const published = $('published', this).html();
        const sumary = $('summary', this).html();
        

        result.push({
          'titulo': titulo,
          'link': linkHref,
          'sumary': sumary,
          'author': author,
          'updated': updated,
          'published': published
        })
      })

      oportunidades['result'] = result;

      return oportunidades
    })
    .then(data => {
      const oportunidades = JSON.stringify(data);
      salvarOportunidades(oportunidades);
      
    })
    .catch(err => {
      console.log(err);
    });

    
}

export function scrapCardapio() {
  const cardapio = {};
  const result = []
  const url = 'https://www.ufpe.br/rucaa';
  axios.get(url)
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);
      const navCabecalho = $('.tabs nav');
      const spansDias = navCabecalho.children();
    
      spansDias.each(function(){
        const nomeDia = $(this).text().trim();
        const spanID = $(this).attr('id');
        const section = $(`[aria-labelledby=${spanID}]`);
        const tabelaIngredientes = $('table', section);
        const tabelaSecundaria = $('table', tabelaIngredientes);
        const tabelaTres = $('table', tabelaSecundaria);
        
        let tbody;

        if(nomeDia === 'Sexta'){
          tbody = $('tbody', tabelaTres);
        } 
        else if(nomeDia === 'Quarta' || nomeDia === 'Quinta') {
          tbody = $('tbody', tabelaSecundaria);
        }
        else {
          tbody = $('tbody', tabelaIngredientes);
        }

        const tr = $('tr:not(:first-child)', tbody);

      
        const ingredientesAlmoco = [];
        const ingredientesJantar = [];

        tr.each(function(){
          const almocoColuna = $('td:first-child', this);
          const jantarColuna = $('td:last-child', this);
          const ingredienteAlmoco = $(almocoColuna).text();
          const ingredienteJantar = $(jantarColuna).text();

          ingredientesAlmoco.push(ingredienteAlmoco);
          ingredientesJantar.push(ingredienteJantar);
          
        })
        
        result.push({'dia': nomeDia, 'refeicoes': {'almoco': ingredientesAlmoco, 'janta': ingredientesJantar}});
        
      })
      
      cardapio['result'] = result;

      return cardapio;
  })
  .then(data => {
    const cardapio = JSON.stringify(data);
    salvarCardapio(cardapio);
  
  })
  .catch(err => {
    console.log(err)
  });

}

export function scrapNoticias(){
  const noticias = {}
  const result = []
  const url = 'https://www.ufpe.br/agencia/noticias/-/asset_publisher/dlhi8nsrz4hK/rss';
  axios.get(url)
    .then(res => {
      const xml = res.data;
      const $ = cheerio.load(xml);
      const entryTags = $('entry');

      entryTags.each(function() {
        const titulo = $('title', this).html();
        const linkHref = $('link', this).attr('href');
        const author = $('name', this).html();
        const updated = $('updated', this).html();
        const published = $('published', this).html();
        

        result.push({
          'titulo': titulo,
          'link': linkHref,
          'author': author,
          'updated': updated,
          'published': published
        })
      })

      noticias['result'] = result;

      return noticias
    })
    .then(data => {
      const noticias = JSON.stringify(data);
      salvarNoticias(noticias);
    })
    .catch(err => console.log(err));
}

export function scrapNoticiasCampus(){
  const noticias = {}
  const result = []
  const url = 'https://www.ufpe.br/agencia/noticias-do-campus/-/asset_publisher/560IJ2hfNESM/rss';
  axios.get(url)
    .then(res => {
      const xml = res.data;
      const $ = cheerio.load(xml);
      const entryTags = $('entry');

      entryTags.each(function() {
        const titulo = $('title', this).html();
        const linkHref = $('link', this).attr('href');
        const author = $('name', this).html();
        const updated = $('updated', this).html();
        const published = $('published', this).html();
        

        result.push({
          'titulo': titulo,
          'link': linkHref,
          'author': author,
          'updated': updated,
          'published': published
        })
      })

      noticias['result'] = result;

      return noticias
    })
    .then(data => {
      const noticiasCampus = JSON.stringify(data);
      salvarNoticiasCampus(noticiasCampus);
    })
    .catch(err => {
      console.log(err);
    });
    
}
