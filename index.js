const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot activo'));
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  },
  // ACA VA TU NUMERO, SIN + NI ESPACIOS
  pairWithPhoneNumber: '56932158417'
});

// Si por alguna razón sale QR, igual lo muestra
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Escanea el QR...');
});

// ACA SALE EL CODIGO DE 8 LETRAS
client.on('code', (code) => {
  console.log('TU CODIGO ES:', code);
});

client.on('ready', () => {
  console.log('Bot listo');
});

client.on('auth_failure', (msg) => {
  console.error('Error de autenticacion:', msg);
});

client.on('disconnected', (reason) => {
  console.log('Bot desconectado:', reason);
});

const respuestas = {
  'hype': '🔥 HYPE ACTIVADO 🔥 ¿Listo para el show?',
  'hola': 'Holaaa 🔥 ¿Qué onda?',
  'buenas': 'Buenaaas 🔥 ¿Cómo vai?',
  'que onda': 'Aquí andamos al 100 🔥 ¿Y tú?',
  'messi': '🐐 MESSI ES EL MEJOR DE LA HISTORIA, no hay debate',
  'leo': '🐐 LEO MESSI, EL GOAT',
  'goat': '🐐 GOAT = MESSI, fin de la discusión',
  'ronaldo': 'CR7 es crack, pero Messi es de otro planeta 🐐',
  'cr7': 'CR7 es crack, pero Messi es de otro planeta 🐐',
  'bicho': 'El bicho es bueno, pero el GOAT es Messi 🐐',
  'neymar': 'Neymar es magia pura ✨ pero Messi es el GOAT',
  'ney': 'Neymar es magia pura ✨',
  'mbappe': 'Mbappé corre caleta, pero todavía le falta para ser Messi 🐐',
  'gol': '¡¡GOOOOOL!! ⚽🔥🔥🔥',
  'futbol': 'El fútbol es vida ⚽🔥',
  'fútbol': 'El fútbol es vida ⚽🔥',
  'chile': '🇨🇱 ¡VAMOS CHILE!',
  'argentina': '🇦🇷 ¡VAMOS ARGENTINA! ¡MESSI!',
  'barcelona': '🔵🔴 ¡VISCA BARÇA!',
  'barca': '🔵🔴 ¡VISCA BARÇA!',
  'psg': 'El PSG sin Messi no es lo mismo 🐐',
  'real madrid': 'El Madrid es bueno, pero Messi los tenía de hijos 🐐',
  'madrid': 'El Madrid es bueno, pero Messi los tenía de hijos 🐐',
  'inter miami': 'Inter Miami revivió con Messi 🐐🌴',
  'miami': 'Inter Miami revivió con Messi 🐐🌴',
  'copa': '🏆 ¡A POR LA COPA!',
  'mundial': '🏆 El Mundial 2022 fue de Messi, historia pura',
  'balon de oro': '🏆 8 Balones de Oro, nadie como Messi',
  'ayuda': 'Escribe: hype, messi, gol, hola, menu, etc. 🔥',
  'help': 'Escribe: hype, messi, gol, hola, menu, etc. 🔥',
  'menu': '🔥 MENÚ HYPE 🔥\n- hype\n- messi\n- gol\n- ronaldo\n- neymar\n- chile\n- argentina\n- barcelona',
  'comandos': '🔥 MENÚ HYPE 🔥\n- hype\n- messi\n- gol\n- ronaldo\n- neymar\n- chile\n- argentina\n- barcelona',
  'gracias': 'De nada crack 🔥',
  'chao': 'Chaooo, nos vemos 🔥',
  'adios': 'Chaooo, nos vemos 🔥',
  'jaja': 'JAJAJAJA 😂🔥',
  'lol': 'JAJAJAJA 😂🔥',
  'xd': 'XD 😂🔥',
  'crack': 'Tú eres el crack 🔥',
  'idolo': 'El ídolo es Messi 🐐',
  'leyenda': 'Leyenda = Messi 🐐',
  'rey': '👑 El rey es Messi',
  'king': '👑 El rey es Messi',
  'como estas': 'De pana 🔥 ¿Y tú cómo andai?',
  'quien eres': 'Soy el bot HYPE de Messi 🐐🔥',
  'que hace': 'Aquí esperando que me hables 🔥'
};

function getArg(texto, clave) {
  const index = texto.indexOf(clave);
  if (index === -1) return '';
  return texto.slice(index + clave.length).trim();
}

client.on('message', async (msg) => {
  try {
    const texto = msg.body.toLowerCase().trim();
    const chat = await msg.getChat();

    if (texto.startsWith('!messi ')) {
      const arg = getArg(texto, '!messi ');
      if (!arg) return msg.reply('Escribe algo después de !messi, ej: !messi eres el mejor');
      return msg.reply(`🐐 MESSI DICE: "${arg}" - El GOAT te escuchó 🔥`);
    }

    if (texto.startsWith('!gol ')) {
      const arg = getArg(texto, '!gol ');
      if (!arg) return msg.reply('Escribe algo después de !gol, ej: !gol que golazo');
      return msg.reply(`⚽ ¡¡GOOOOL!! ${arg.toUpperCase()} 🔥🔥🔥`);
    }

    if (texto.startsWith('!hype ')) {
      const arg = getArg(texto, '!hype ');
      if (!arg) return msg.reply('Escribe algo después de !hype, ej: !hype vamos');
      return msg.reply(`🔥 HYPE: ${arg.toUpperCase()} 🔥🔥🔥`);
    }

    if (texto.startsWith('!decir ')) {
      const arg = getArg(texto, '!decir ');
      if (!arg) return msg.reply('Escribe algo después de !decir');
      return msg.reply(arg);
    }

    if (texto.startsWith('!pregunta ')) {
      const arg = getArg(texto, '!pregunta ');
      if (!arg) return msg.reply('Escribe tu pregunta después de !pregunta');
      const respuestasPregunta = [
        'Sí, de una 🔥',
        'Obvio que sí 😎',
        'Mmm, puede ser 🤔',
        'No creo bro 😅',
        'Pregúntale a Messi 🐐',
        '100% que sí 🔥',
        'Ni cagando 😂'
      ];
      const r = respuestasPregunta[Math.floor(Math.random() * respuestasPregunta.length)];
      return msg.reply(`Pregunta: ${arg}\nRespuesta: ${r}`);
    }

    // Buscar respuesta exacta o que contenga la palabra
    for (const clave in respuestas) {
      if (texto === clave || texto.includes(clave)) {
        await chat.sendStateTyping();
        await new Promise(r => setTimeout(r, 800));
        await chat.clearState();
        return msg.reply(respuestas[clave]);
      }
    }

    // Si no encontró nada, responde genérico solo si te mencionan
    if (texto.includes('bot') || texto.includes('hype')) {
      return msg.reply('¿Me llamaste? 🔥 Escribe !menu para ver qué puedo hacer');
    }

  } catch (e) {
    console.log('Error en mensaje:', e.message);
  }
});

client.initialize();
