/**********************************
 * VERSÃO 1.1
 * 
 * JavaScript para a tela de cadastro de novo filme,
 * cujo objetivo é adicionar um novo filme na API
 * fornecida pelos professores Marcel e Vitor para
 * o Projeto Integrado
 ***********************************/

const btnRegistrar = document.getElementById('send')

const enviarFilme = async function() {

    //Primeiro é preciso resgatar o caminho da API
    //para realizar a função POST
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto1/fecaf/novo/filme`

    //Recebe os elementos das caixas do HTML
    let nome = document.getElementById('nome')
    let sinopse = document.getElementById('sinopse')
    let img = document.getElementById('imageUrl')
    let valor = document.getElementById('valor')

    let filmeJSON = {
        nome: nome.value,
        sinopse: sinopse.value,
        image: img.value,
        valor: parseFloat(valor.value)
    }

    //Criar um arquivo JSON com os atributos e valores
    //que serão encaminhados para a API
    // filmeJSON.nome = nome.value
    // filmeJSON.sinopse = sinopse.value
    // filmeJSON.imageUrl = img.value
    // filmeJSON.valor = valor.value

    //Agora, realizar a requisição POST para encaminhar
    //as informações contidas no FORM para a API
    const resposta = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(filmeJSON)
    })

    //Agora é preciso aguardar a resposta da API
    const resultado = await resposta.json()

    //Tratamento para informar ao usuário
    //que o filme foi cadastrado com sucesso ou
    //se houve erro
    if(resposta.status === 201)
        alert('EUREKA! O filme foi cadastrado com sucesso!')
    else
        alert('A requisição não pode ser completada ou a API está fora do ar.')
}

btnRegistrar.addEventListener('click', function(){
    enviarFilme()
})