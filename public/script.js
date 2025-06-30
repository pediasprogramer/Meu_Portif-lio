fetch('/api/conteudo')
  .then(res => res.json())
  .then(data => {
    document.getElementById('titulo').innerText = data.titulo;
    document.getElementById('descricao').innerText = data.descricao;
    document.getElementById('imagem').src = data.imagem;
  });
