const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
