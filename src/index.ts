import { Context, deunionize, Markup, Telegraf } from 'telegraf';
import createDebug from 'debug';

import { start } from './commands';
import video, { socialData, videoData } from './commands/video';

const debug = createDebug('bot');

const ENVIRONMENT = process.env.NODE_ENV || '';
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const USERNAME = process.env.USERNAME || '';
const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const WEBHOOK_URL = `${process.env.WEBHOOK_URL}/bot${BOT_TOKEN}`;

const bot = new Telegraf(BOT_TOKEN);

bot.command('start', start.start());
bot.command('about', start.about());
bot.command('help', start.help());
bot.command('podcast', video.video());
// bot.command('inline', keyboardTest.inline());
// bot.command('simple', keyboardTest.simple());
// bot.command('oneTime', keyboardTest.oneTime());

// bot.command('onetime', oneTime());

bot.hears('⚡️ Ultimo video', video.last());
bot.hears('🔍 Cerca un video', video.search());
bot.hears('🗓 Schedule', video.schedule());
bot.hears('✨ Social', video.social());

bot.hears('🔴 Live', video.getVideosPov('live'));
bot.hears('⭐️ Speciali', video.getVideosPov('special'));
bot.hears('🙌🏻 Pov', video.pov());
bot.hears('🧔🏼🦁 Tyrion', video.getVideosPov('tyrion'));
bot.hears('🧔🏻🐺 Eddard', video.getVideosPov('eddard'));
bot.hears('🌹🐺 Sansa', video.getVideosPov('sansa'));
bot.hears('👩🏼⚔️ Brienne', video.getVideosPov('brienne'));
bot.hears('🧔‍♂️🦁 Jaime', video.getVideosPov('jaime'));
bot.hears('👩🏼🦁 Cersei', video.getVideosPov('cersei'));
bot.hears('🔙 Torna alla scelta video', video.search());
bot.hears('❌ Chiudi', start.closeKeyboard());

bot.action(
  videoData.filter({
    action: 'open',
  }),
  video.openVideo(),
);

bot.action('facebook', video.facebook());
bot.action('twitter', video.twitter());
bot.action('instagram', video.instagram());

const production = () => {
  debug('Bot runs in production mode');
  debug(`${USERNAME} setting webhook: ${WEBHOOK_URL}`);
  bot.telegram.setWebhook(WEBHOOK_URL);
  debug(`${USERNAME} starting webhook on port: ${PORT}`);
  // bot.telegram.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
};

const development = () => {
  debug('Bot runs in development mode');
  debug(`${USERNAME} deleting webhook`);
  bot.telegram.deleteWebhook();
  debug(`${USERNAME} starting polling`);
  bot.launch();
};

ENVIRONMENT === 'production' ? production() : development();
