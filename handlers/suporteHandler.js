function suporteN1(chamado){
    console.log("N1 recebeu o chamado");
    if(chamado.prioridade === "normal"){
         console.log("N1 assumiu o chamado")
         return "suporte atendeu o chamado";
    }
    console.log("N1 nao conseguiu resolver");
    console.log("encaminhadno para N2");
    return suporteN2(chamado); 
    
}
function suporteN2(chamado){
    console.log("N2 recebeu o chamado");
    if(chamado.prioridade === "normal"){
         console.log("N2 assumiu o chamado")
         return "suporte atendeu o chamado";
    }
    console.log("N2 nao conseguiu resolver");
    console.log("encaminhadno para especialista");
    return especialista(chamado); 
    
}
function especialista(chamado){
    console.log("especialista recebeu o chamado");
    if(chamado.prioridade === "alta"){
         console.log("especialista assumiu o chamado")
         return "suporte especialista atendeu o chamado";
    }
   throw new Error("nenhum responsavel encontrado");
      
}
module.exports = {
    suporteN1
}