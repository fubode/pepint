const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync('key.pem'), // Ruta completa al archivo key.pem
  cert: fs.readFileSync('cert.pem'), // Ruta completa al archivo key.pem
};

app.use(express.static('build')); // Ajusta esto en caso de que tu carpeta de compilación sea diferente

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const httpsServer = https.createServer(options, app);

httpsServer.listen(3006, () => {
  console.log('Servidor HTTPS en ejecución en el puerto 3001');
});
