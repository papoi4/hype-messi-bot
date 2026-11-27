const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--single-process', '--disable-gpu']
  }
});
let botActivo = true;
client.on('qr', qr => { qrcode.generate(qr, { small: true }); });
client.on('ready', () => console.log('Bot LISTO'));
client.on('group_join', async (notif) => {
if (!botActivo) return;
const chat = await notif.getChat();
await chat.sendMessage(`Bienvenido al grupo HYPE 🔥\nSoy el bot 👹\nEscribe *!menu* pa ver que hago`);
});
client.on('message', async msg => {
if (!botActivo && msg.body !== '!open') return;
const texto = msg.body.toLowerCase();
const args = msg.body.split(' ').slice(1).join(' ');
if (texto === '!menu') {
msg.reply(`*BOT HYPE 👹*\n\n*!img [cosa]* - imagen de lo que pidas\nEj: !img gato\n\n*!audio [cosa]* - audio / cancion\nEj: !audio bad bunny\n\n*!open* - prender bot\n*!close* - apagar bot`);
}
if (texto.startsWith('!img ')) {
if (!args) return msg.reply('Escribe que quieres, ej: *!img perro*');
const url = `https://source.unsplash.com/800x600/?${encodeURIComponent(args)}`;
const media = await MessageMedia.fromUrl(url);
msg.reply(media, undefined, { caption: `Aqui tu imagen de: ${args} 👹` });
}
if (texto.startsWith('!audio ') || texto.startsWith('!cancion ')) {
if (!args) return msg.reply('Escribe que quieres, ej: *!audio bad bunny*');
msg.reply(`Tu audio de: *${args}* 🎵\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(args)}`);
}
if (texto === '!close') { botActivo = false; msg.reply('Bot apagado 😴 escribe !open pa prenderme'); }
if (texto === '!open') { botActivo = true; msg.reply('Bot prendido de nuevo 👹🔥'); }
});
client.initialize();

setTimeout(async () => {
    try {
        const code = await client.requestPairingCode('56932158417');
        console.log('TU CODIGO ES: ' + code);
    } catch (e) {
        console.log('Error codigo: ' + e.message);
    }
}, 5000);
