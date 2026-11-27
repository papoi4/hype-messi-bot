const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot activo'));
app.listen(PORT, () => console.log('Server en puerto ' + PORT));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run']
  }
});

client.on('code', (code) => {
  console.log('TU CODIGO ES: ' + code);
});

client.on('ready', () => {
  console.log('BOT LISTO!');
});

client.on('message', async (msg) => {
  const body = msg.body.toLowerCase().trim();

  if (body === '!ping') {
    msg.reply('pong 🏓');
  }
  else if (body.startsWith('!messi')) {
    msg.reply('MESSI EL GOAT 🐐');
  }
  else if (body === '!hola') {
    msg.reply('Holaa 👋 ¿qué onda?');
  }
  else if (body === '!bye') {
    msg.reply('Chaoo 👋');
  }
  else if (body === '!ayuda') {
    msg.reply('Comandos: !ping, !messi, !hola, !bye, !ayuda, !info, !todo, !reglas');
  }
  else if (body === '!info') {
    msg.reply('Bot de HYPE 👹 activo 24/7');
  }
  else if (body === '!todo') {
    msg.reply('Lista de comandos: !ping, !messi, !hola, !bye, !ayuda, !info, !reglas');
  }
  else if (body === '!reglas') {
    msg.reply('Reglas: 1. Respeto 2. No spam 3. Pásenla bien 👹');
  }
});

client.initialize();

// Pedir codigo de vinculacion
setTimeout(async () => {
  try {
    const code = await client.requestPairingCode('56932158417');
    console.log('TU CODIGO ES: ' + code);
  } catch (e) {
    console.log('Error pidiendo codigo: ' + e.message);
  }
}, 8000);

