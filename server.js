const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página de verificação de data
app.get('/verificar-data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'verificar-data.html'));
});

// Rota para a página de aniversário
app.get('/aniversario-de-namoro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aniversario-de-namoro.html'));
});

// Rota para capturar todas as outras requisições e redirecionar para a página principal
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
