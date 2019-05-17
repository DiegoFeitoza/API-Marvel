import { resolve } from 'path';

const md5 = require('md5')

var container = $('#lista-personagens'),
    rowCard = $('#corpo-card').clone().html();

const carregaApi = (limit,apikey) => {
    let td = new Date().getTime()
    let createHash = md5( td + '00667779de47a3d98d14531bf736adb99bf596cc' + apikey)
    let epMarvel = `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&apikey=${apikey}&ts=${td}&hash=${createHash}`

    return epMarvel;
}

const chamaApi = (ep) => {
    fetch(ep).then(res => {
        console.log('%cFoi 1\n==========================================\n','color: blue;')
        return res.json()
    }).then(res => {
        console.log('%cResposta 2: \n','color: green;',res)
        return res.data
    }).then(res => {
        console.log('%cResposta 3: \n','color: green;', res)
        return res.results
    }).then(res => {
        console.log('%cResposta 4: \n','color: green;',res)
        res.map(response => {
            console.log('%cResposta item: ','color: green;',response)
            createCardPersonagens(response)
        })
    }).then(() => {
        console.log('%c\n=============================================\n\nFinal da execução','color: blue;')
        ajustaH()
    }).catch(error => {
        console.log('%cErro: %c"%s"\n=============================================\n\n','color: red', 'color: blue',error)
    })
}

const createCardPersonagens = (res, cont) => {
    let linksPersonagem ='',
        corpoLinks = '<a href="{LINKPERSONAGEM}" target="_blank"> {NOMELINK}</a>';
    if(res.urls.length){
        res.urls.map(resp => {
            linksPersonagem += corpoLinks.replace('{LINKPERSONAGEM}',resp.url).replace('{NOMELINK}',resp.type)
        })
    }
    container.append(rowCard
                        .replace('{IMAGEM}',res.thumbnail.path+'.'+res.thumbnail.extension)
                        .replace('{LINKPERSONAGEM}', (res.resourceURI) ? res.resourceURI : 'javascript:;')
                        .replace(/{NAME}/g,res.name)
                        .replace('{LINKS}',(linksPersonagem != '') ? linksPersonagem : '')
                        );
}

const ajustaH = () => {    
    let maiorC = 0, maiorI = 0, maiorD = 0, maiorN = 0;
    container.find('.card-personagem').map((count,item) => {
        (item.clientHeight > maiorC) ? maiorC=item.clientHeight : ''
    })
    container.find('.card-personagem .imagem-personagens').map((count,item) => {
        (item.clientHeight > maiorI) ? maiorI=item.clientHeight : ''
    })
    container.find('.card-personagem .nome-personagem').map((count,item) => {
        (item.clientHeight > maiorN) ? maiorN=item.clientHeight : ''
    })

    container.find('.card-personagem').css({'height':(maiorC+30)+'px'})
    container.find('.card-personagem .imagem-personagens').parent().css({'height':maiorI+'px', 'lineHeight':maiorI+'px'})
    container.find('.card-personagem .nome-personagem').css({'height':maiorN+'px'})
}

export {carregaApi,chamaApi}