document.getElementById('upload-button').addEventListener('click', function() {
  document.getElementById('profile-upload').click();
});

document.getElementById('profile-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-img').src = e.target.result;
      document.getElementById('profile-img').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('cadastro-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  fetch('http://192.168.0.103:5000/usuarios/cadastrar', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json().then(data => ({ status: response.status, body: data })))
  .then(({ status, body }) => {
    if (status === 400) {
      document.getElementById('response').innerText = body.error;
      document.getElementById('response').style.color = 'red';
    } else {
      window.location.href = "login.html"
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    document.getElementById('response').innerText = 'Ocorreu um erro ao cadastrar o usuário.';
    document.getElementById('response').style.color = 'red';
  });
});
