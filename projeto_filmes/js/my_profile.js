/**********************************************************************
 * VERSÃO 1.5
 * Documento destinado às funções da página de perfil do site,
 * onde ficam os cards de todos os filmes da wiki (API)
*********************************************************************/

// Variável para armazenar todos os filmes carregados da API
let todosFilmes = [];

// Função para buscar os dados da API
const getFilmes = async function() {
    // URL da API para pegar os filmes
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto1/fecaf/listar/filmes`;

    try {
        // fetch() realiza a requisição na API
        let response = await fetch(url);

        // verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('A API não retornou as informações solicitadas ou o servidor está fora do ar.');
        }

        // traz os dados dos filmes em formato JSON
        let dadosFilmes = await response.json();

        // Armazena todos os filmes para o filtro posterior
        todosFilmes = dadosFilmes.filmes;

        // trata se a API retornou os dados
        setCreateCard(todosFilmes);

    } catch (error) {
        alert(error.message);
    }
}

const setCreateCard = function(filmes) {
    let divCardFilmes = document.getElementById('cardFilmes');

    // Limpa qualquer conteúdo existente
    divCardFilmes.innerHTML = '';

    // para cada filme na lista de filmes fornecida
    filmes.forEach(function(itemFilme) {
        // criando os elementos div no html e bloco de texto
        // para colocar conteúdo escrito
        let divCardWiki = document.createElement('div');
        let h2FilmeTitulo = document.createElement('h2');
        let textoTitulo = document.createTextNode(itemFilme.nome);
        let divCardImg = document.createElement('div');
        let img = document.createElement('img');
        let cardSinopse = document.createElement('div');
        let textoSinopse = document.createTextNode(itemFilme.sinopse);
        let cardValor = document.createElement('div');
        let textoValor = document.createTextNode(`R$ ${itemFilme.valor.toFixed(2)}`);
        let btnExcluir = document.createElement('button');
        let textoExcluir = document.createTextNode('excluir');
        let btnEditar = document.createElement('button');
        let textoEditar = document.createTextNode('editar');

        // adicionando as propriedades dos elementos no HTML
        divCardWiki.setAttribute('class', 'card-wiki');
        h2FilmeTitulo.setAttribute('class', 'filme-titulo');
        divCardImg.setAttribute('class', 'card-img');
        img.setAttribute('src', itemFilme.image);
        cardSinopse.setAttribute('class', 'card-sinopse');
        cardValor.setAttribute('class', 'card-valor');
        btnExcluir.setAttribute('class', 'btn-excluir');
        btnEditar.setAttribute('class', 'btn-editar');

        // adicionando as novas divs no elemento pai (card-filmes)
        divCardFilmes.appendChild(divCardWiki);
        divCardWiki.appendChild(h2FilmeTitulo);
        h2FilmeTitulo.appendChild(textoTitulo);
        divCardWiki.appendChild(divCardImg);
        divCardImg.appendChild(img);
        divCardWiki.appendChild(cardSinopse);
        cardSinopse.appendChild(textoSinopse);
        divCardWiki.appendChild(cardValor);
        cardValor.appendChild(textoValor);
        divCardWiki.appendChild(btnExcluir);
        btnExcluir.appendChild(textoExcluir);
        divCardWiki.appendChild(btnEditar);
        btnEditar.appendChild(textoEditar);

        btnExcluir.addEventListener('click', function(){
            excluirFilme(itemFilme.id);
        });

        btnEditar.addEventListener('click', function(){
            editarFilme(itemFilme);
        });
    });
}

//Função para excluir um filme
const excluirFilme = async function(filmeId) {
    // URL da API para realizar a função DELETE
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto1/fecaf/excluir/filme/${filmeId}`;

    try {
        // Realizar a requisição DELETE para excluir o filme
        const resposta = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Tratamento para informar ao usuário
        if (resposta.status === 200) {
            alert('O filme foi excluído com sucesso!');
            // Atualiza a lista de filmes após a exclusão
            getFilmes();
        } else {
            const resultado = await resposta.json();
            alert(`Erro ${resposta.status}: ${resultado.message || 'A requisição não pode ser completada ou a API está fora do ar.'}`);
        }
    } catch (error) {
        alert(`Erro na requisição: ${error.message}`);
    }
}

//Função para editar os dados dos filmes
const editarFilme = function(filme) {
    // Cria um formulário de edição
    const formHtml = `
        <div id="editForm">
            <label for="editNome">nome:</label>
            <input type="text" id="editNome" value="${filme.nome}">
            <label for="editSinopse">sinopse:</label>
            <input type="text" id="editSinopse" value="${filme.sinopse}">
            <label for="editImageUrl">imagem:</label>
            <input type="text" id="editImageUrl" value="${filme.image}">
            <label for="editValor">valor:</label>
            <input type="number" id="editValor" value="${filme.valor}">
            <button id="saveChanges">salvar</button>
            <button id="cancelChanges">cancelar</button>
        </div>
    `;

    // Adiciona o formulário ao corpo do documento
    document.body.insertAdjacentHTML('beforeend', formHtml);

    // Adiciona evento de clique aos botões do formulário
    document.getElementById('saveChanges').addEventListener('click', function() {
        const updatedFilme = {
            id: filme.id,
            nome: document.getElementById('editNome').value,
            sinopse: document.getElementById('editSinopse').value,
            image: document.getElementById('editImageUrl').value,
            valor: parseFloat(document.getElementById('editValor').value)
        };
        salvarEdicao(updatedFilme);
    });

    document.getElementById('cancelChanges').addEventListener('click', function() {
        document.getElementById('editForm').remove();
    });
}

//Função para salvar as edições
const salvarEdicao = async function(filme) {
    // URL da API para realizar a função PUT
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto1/fecaf/editar/filme/${filme.id}`;

    try {
        // Realizar a requisição PUT para editar o filme
        const resposta = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filme)
        });

        // Tratamento para informar ao usuário
        if (resposta.status === 200) {
            alert('O filme foi editado com sucesso!');
            // Atualiza a lista de filmes após a edição
            document.getElementById('editForm').remove();
            getFilmes();
        } else {
            const resultado = await resposta.json();
            alert(`Erro ${resposta.status}: ${resultado.message || 'A requisição não pode ser completada ou a API está fora do ar.'}`);
        }
    } catch (error) {
        alert(`Erro na requisição: ${error.message}`);
    }
}

// Função para filtrar filmes com base no nome
const filtrarFilmes = function(nomeFilme) {
    console.log("Filtrando filmes com o nome:", nomeFilme);  // Adicione este log
    const filmesFiltrados = todosFilmes.filter(filme => 
        filme.nome.toLowerCase().includes(nomeFilme.toLowerCase())
    );
    console.log("Filmes filtrados:", filmesFiltrados);  // Adicione este log
    setCreateCard(filmesFiltrados);
}

// Adiciona um event listener ao campo de busca para filtrar os filmes conforme o usuário digita
document.querySelector('.search input[name="search"]').addEventListener('input', function(event) {
    filtrarFilmes(event.target.value);
});

window.addEventListener('load', function() {
    getFilmes();
});