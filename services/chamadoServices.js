const{suporteN1} = require ('../handlers/suporteHandler')
 
function criar(dados){

    console.log("2 - SERVICE recebeu", dados);
    const chamado = {
        id: 1,
        titulo: dados.titulo,
        prioridade: dados.prioridade,
        status:"aberto" 
    }
    console.log("3 - SERVICE criou", chamado);
    return chamado
}

module.exports = { criar };