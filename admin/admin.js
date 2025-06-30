if (location.pathname.endsWith('login.html')) {
  document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      })
    });
    if (res.ok) {
      window.location.href = 'dashboard.html';
    } else {
      alert('Login inválido!');
    }
  };
}

if (location.pathname.endsWith('dashboard.html')) {
  const form = document.getElementById('editForm');
  fetch('/api/conteudo')
    .then(res => res.json())
    .then(data => {
      form.titulo.value = data.titulo;
      form.descricao.value = data.descricao;
      form.imagem.value = data.imagem;
    });

  form.onsubmit = async (e) => {
    e.preventDefault();
    const dados = {
      titulo: form.titulo.value,
      descricao: form.descricao.value,
      imagem: form.imagem.value
    };
    await fetch('/api/conteudo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    alert('Conteúdo salvo com sucesso!');
  };
}
