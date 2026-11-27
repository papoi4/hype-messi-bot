const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => res.send('Bot activo'));
app.listen(PORT, () => console.log('Server en puerto ' + PORT));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--single-process', '--disable-gpu']
  },
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  }
});

let codigoPedido = false;

client.on('qr', async (qr) => {
  console.log('QR RECIBIDO, pidiendo codigo...');
  if (!codigoPedido) {
    codigoPedido = true;
    try {
      const codigo = await client.requestPairingCode('56932158417');
      console.log('TU CODIGO ES: ' + codigo);
    } catch (e) {
      console.log('ERROR PIDIENDO CODIGO: ' + e.message);
      codigoPedido = false;
    }
  }
});

client.on('ready', () => console.log('BOT LISTO!'));
client.on('authenticated', () => console.log('AUTENTICADO!'));
client.on('auth_failure', (m) => console.log('FALLO AUTH: ' + m));
client.on('disconnected', (r) => console.log('DESCONECTADO: ' + r));

client.initialize();
