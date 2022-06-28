import { Context, Markup } from 'telegraf';
import createDebug from 'debug';
import { author, homepage, name, version } from '../../../package.json';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: Context) => {
  debug(`Triggered "start" command`);

  const message = `Welcome in asoiaf podcast bot ❄️🔥`;

  return ctx.replyWithHTML(message);
};

const closeKeyboard = () => async (ctx: Context) => {
  ctx.reply(`Ciao ciao ${ctx.from?.username} 👋🏻`, Markup.removeKeyboard());
};

const about = () => async (ctx: Context) => {
  ctx.replyWithHTML(
    `The hand of the king (${version}) è stato sviluppato con il ❤️ da <a href="https://gabrielenapoli.dev">${author}</a> per gli appassionati di ASOIAF e del podcast del ghiaccio e del fuoco.`,
  );
};

const help = () => async (ctx: Context) => {
  ctx.replyWithHTML(
    `Elenco dei comandi possibili:
    /podcast => Per cercare gli episodi, visionare la schedule del canale (SOON) e info sul podcast
    /asoiaf => Informazioni sul mondo di asoiaf (SOON)
    /about => Info sul bot
    `,
  );
};

export default { start, closeKeyboard, about, help };
