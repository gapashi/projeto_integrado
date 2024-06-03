document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
});

document.getElementById('signupButton').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMessage = document.getElementById('loginError');

    // Verificação se os campos não estão vazios
    if (email.trim() === '' || password.trim() === '') {
        errorMessage.textContent = 'Os campos de email e senha não podem estar vazios';
        return;
    }

    // Fazendo a requisição para a API
    fetch('https://back-login.vercel.app/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados da API');
            }
            return response.json();
        })
        .then(data => {
            const user = data.find(user => user.email === email && user.senha === password);
            if (user) {
                errorMessage.textContent = '';
                window.location.href = './my_profile.html'; // Redireciona para my_profile.html
            } else {
                errorMessage.textContent = 'Erro ao fazer o login: e-mail ou senha errados';
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            errorMessage.textContent = 'Erro ao fazer a requisição para a API';
        });
});
