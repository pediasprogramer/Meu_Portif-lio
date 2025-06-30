const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// login básico
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false });
});

// conteúdo do site
app.get('/api/conteudo', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, 'conteudo.json'), 'utf8');
  res.json(JSON.parse(data));
});

app.post('/api/conteudo', (req, res) => {
  fs.writeFileSync(path.join(__dirname, 'conteudo.json'), JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.redirect('/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
