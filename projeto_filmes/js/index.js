window.addEventListener('load', function() {
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const intervalo = 3000; // Define o intervalo de tempo em milissegundos entre as transições

    let indiceAtual = 0; // Inicia com a primeira imagem

    function avancar() {
        indiceAtual++;
        if (indiceAtual >= carrosselItems.length) {
            indiceAtual = 0; // Reinicia quando alcança a última imagem
        }
        atualizarCarrossel();
    }

    function retroceder() {
        indiceAtual--;
        if (indiceAtual < 0) {
            indiceAtual = carrosselItems.length - 1; // Volta para a última imagem quando está na primeira
        }
        atualizarCarrossel();
    }

    function atualizarCarrossel() {
        const deslocamento = -indiceAtual * carrosselItems[0].offsetWidth; // Calcula o deslocamento necessário
        carrosselContainer.style.transform = `translateX(${deslocamento}px)`; // Aplica o deslocamento
    }

    setInterval(avancar, intervalo); // Inicia o carrossel automático
});