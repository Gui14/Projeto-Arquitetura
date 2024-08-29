document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    const data = {
        email: email,
        senha: senha
    };

    fetch('http://192.168.0.103:5000/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login bem-sucedido:', data);
        window.location.href = "index.html"; // Redireciona para outra página
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Ocorreu um erro ao logar. Credenciais inválidas.';
        document.getElementById('response').style.color = 'red';
    });
});
