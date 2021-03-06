import { Telegraf } from 'telegraf';
import createDebug from 'debug';

import { start } from './commands';
import video, { videoData } from './commands/video';
import asoiaf from './commands/asoiaf';

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
bot.command('character', asoiaf.character());
bot.command('house', asoiaf.house());

bot.hears('β‘οΈ Ultimo video', video.last());
bot.hears('π Cerca un video', video.search());
bot.hears('π Schedule', video.schedule());
bot.hears('β¨ Social', video.social());

bot.hears('π΄ Live', video.getVideosPov('live'));
bot.hears('β­οΈ Speciali', video.getVideosPov('special'));
bot.hears('ππ» Pov', video.pov());
bot.hears('π§πΌπ¦ Tyrion', video.getVideosPov('tyrion'));
bot.hears('π§π»πΊ Eddard', video.getVideosPov('eddard'));
bot.hears('πΉπΊ Sansa', video.getVideosPov('sansa'));
bot.hears('π©πΌβοΈ Brienne', video.getVideosPov('brienne'));
bot.hears('π§ββοΈπ¦ Jaime', video.getVideosPov('jaime'));
bot.hears('π©πΌπ¦ Cersei', video.getVideosPov('cersei'));
bot.hears('π Torna alla scelta video', video.search());
bot.hears('β Chiudi', start.closeKeyboard());

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
