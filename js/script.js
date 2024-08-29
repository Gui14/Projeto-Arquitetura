document.addEventListener('DOMContentLoaded', function() {
    const sessionToken = getCookie('session_token');
    if (!sessionToken) {
        // Se não houver token de sessão, redirecionar para a página de login
       
    } else {
        // Verificar o token de sessão no servidor ou usar dados armazenados no cliente
        fetch('http://192.168.0.103:5000/usuarios/detalhes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token inválido ou expirado');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                // Token inválido ou expirado
                window.location.href = 'login.html';
            } else {
                // Atualize a interface do usuário com os dados do usuário
                document.getElementById('nome').innerText = data.nome;
                document.getElementById('email').innerText = data.email;
                if (data.foto_perfil) {
                    document.getElementById('profile-img').src = `http://192.168.0.103:5000/uploads/${data.foto_perfil}`;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            window.location.href = 'login.html';
        });
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}



document.getElementById('logout-button').addEventListener('click', function() {
    document.cookie = 'session_token=; Max-Age=0; path=/;'; // Remove o cookie
    window.location.href = 'login.html'; // Redireciona para a página de login
});


