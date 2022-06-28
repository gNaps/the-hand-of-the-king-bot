import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const oneTime =
  () =>
  ({ reply }: any) => {
    debug(`Triggered "oneTime" command`);

    reply(
      'One time keyboard',
      Markup.keyboard(['/simple', '/inline', '/pyramid']).oneTime().resize(),
    );
  };

const simple = () => (ctx: Context) => {
  debug(`Triggered "simple" command`);

  return ctx.replyWithHTML(
    '<b>Coke</b> or <i>Pepsi?</i>',
    Markup.keyboard(['Coke', 'Pepsi']),
  );
};

const inline = () => (ctx: Context) => {
  debug(`Triggered "inline" command`);
  const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('👍', 'like'),
    Markup.button.callback('👎', 'dislike'),
  ]);

  return ctx.reply('hey', inlineMessageRatingKeyboard);
};

const custom = () => (ctx: Context) => {
  debug(`Triggered "custom" command`);
  return ctx.reply(
    `Ciao ${ctx.from?.username}! Cerca un video o controlla la schedule del canale`,
    Markup.keyboard([
      ['🔍 Cerca un video', '😎 Schedule'],
      ['☸ Social', '📞 Feedback'],
      ['📢 Ads', '⭐️ Rate us', '👥 Share'],
    ]),
  );
};

export default { custom, inline, simple, oneTime };
