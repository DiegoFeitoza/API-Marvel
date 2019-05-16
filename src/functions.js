const md5 = require('md5')
const axios = require('axios')

var container = $('#lista-personagens'),
    rowCard = $('#corpo-card').clone().html();

const carregaApi = (limit,apikey) => {
    let td = new Date().getTime()
    let createHash = md5( td + '00667779de47a3d98d14531bf736adb99bf596cc' + apikey)
    let epMarvel = `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&apikey=${apikey}&ts=${td}&hash=${createHash}`

    return epMarvel;
}

const chamaApi = (ep) => {
    axios.get(ep)
        .then(res => {
                res.data.data.results.map((item, cont) => {
                    createCardPersonagens(item,cont+1)
                    (res.data.data.count == cont+1) ? ajustaH() : ''
                })
            }).catch((error) => {
            console.log(`Error Axios: `,error)
        })
}

const createCardPersonagens = (res, cont) => {
    // console.log(`Data create [${cont}] ========================================|\n`, res)

    container.append(rowCard
                        .replace('{IMAGEM}',res.thumbnail.path+'.'+res.thumbnail.extension)
                        .replace(/{NAME}/g,res.name)
                        .replace('{DESCRICAO}',(res.description && res.description != "") ? res.description : 'Sem descrição'));
}

const ajustaH = () => {    
    let maiorC = 0, maiorI = 0, maiorD = 0, maiorN = 0;
    container.find('.card-personagem').map((count,item) => {
        (item.clientHeight > maiorC) ? maiorC=item.clientHeight : ''
        // console.log('Maior Card: ', item.clientHeight+'px')
    })
    container.find('.card-personagem .imagem-personagens').map((count,item) => {
        (item.clientHeight > maiorI) ? maiorI=item.clientHeight : ''
        // console.log('Maior Imagem: ', item.clientHeight+'px')
    })
    container.find('.card-personagem .descricao-personagem').map((count,item) => {
        (item.clientHeight > maiorD) ? maiorD=item.clientHeight : ''
        // console.log('--Descrição: ', item.clientHeight+'px')
    })
    container.find('.card-personagem .nome-personagem').map((count,item) => {
        (item.clientHeight > maiorN) ? maiorN=item.clientHeight : ''
        // console.log('--Nome: ', item.clientHeight+'px')
    })

    container.find('.card-personagem').css({'height':(maiorC+30)+'px'})
    container.find('.card-personagem .imagem-personagens').parent().css({'height':maiorI+'px'})
    container.find('.card-personagem .descricao-personagem').css({'height':maiorD+'px'})
    container.find('.card-personagem .nome-personagem').css({'height':maiorN+'px'})
    // console.log('Maior height: ', maiorC+'px')
}

export {carregaApi,chamaApi}