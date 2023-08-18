const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync('D:\\FUBODE DEV\\key.pem'), // Ruta completa al archivo key.pem
  cert: fs.readFileSync('D:\\FUBODE DEV\\cert.pem'), // Ruta completa al archivo key.pem
};

app.use(express.static('build')); // Ajusta esto en caso de que tu carpeta de compilación sea diferente

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const httpsServer = https.createServer(options, app);

httpsServer.listen(443, () => {
  console.log('Servidor HTTPS en ejecución en el puerto 443');
});
