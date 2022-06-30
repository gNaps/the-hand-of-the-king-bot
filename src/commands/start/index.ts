import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: Context) => {
  debug(`Triggered "start" command`);

  const message = `
Ciao ${ctx.from?.username} ❄️🔥
Per cominciare a usare il bot puoi utilizzare i seguenti comandi
/podcast => Per cercare gli episodi, visionare la schedule del canale (SOON) e info sul podcast
/character => Personaggio casuale della saga
/house => Casata casuale della saga
/about => Info sul bot
  
per rivedere di nuovo la lista comandi usa /help`;

  return ctx.replyWithHTML(message);
};

const closeKeyboard = () => async (ctx: Context) => {
  ctx.reply(`Ciao ciao ${ctx.from?.username} 👋🏻`, Markup.removeKeyboard());
};

const about = () => async (ctx: Context) => {
  ctx.replyWithHTML(
    `The hand of the king è stato sviluppato con il ❤️ da <a href="https://gabrielenapoli.dev">Napsryu</a> per gli appassionati di ASOIAF e del podcast del ghiaccio e del fuoco.`,
  );
};

const help = () => async (ctx: Context) => {
  ctx.replyWithHTML(
    `
Elenco dei comandi possibili:
/podcast => Per cercare gli episodi, visionare la schedule del canale (SOON) e info sul podcast
/character => Personaggio casuale della saga
/house => Casata casuale della saga
/about => Info sul bot
  `,
  );
};

export default { start, closeKeyboard, about, help };
