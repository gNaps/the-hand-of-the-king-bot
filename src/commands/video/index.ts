import { Context, deunionize, Markup } from 'telegraf';
import createDebug from 'debug';
import { getLastVideo, getVideoByCharacter } from '../../api/video.api';
import { CallbackData } from '@bot-base/callback-data';

const debug = createDebug('bot:about_command');

export const videoData = new CallbackData<{
  id: string;
  action: string;
}>('video', ['id', 'action']);

export const socialData = new CallbackData<{
  url: string;
  action: string;
}>('social', ['url', 'action']);

const video = () => (ctx: Context) => {
  debug(`Triggered "video" command`);
  return ctx.reply(
    `Ciao ${ctx.from?.username}! Cerca un video o controlla la schedule del canale`,
    Markup.keyboard([
      '⚡️ Ultimo video',
      '🔍 Cerca un video',
      '🗓 Schedule',
      '✨ Social',
    ])
      .oneTime()
      .resize(),
  );
};

const last = () => async (ctx: Context) => {
  debug(`Triggered "last" option`);
  const data = await getLastVideo();
  return data
    ? ctx.reply(
        `https://www.youtube.com/watch?v=${data[0].attributes.idYoutube}`,
      )
    : ctx.reply("Oooops! Non sono riuscito a recuperare l'ultimo video");
};

const search = () => (ctx: Context) => {
  debug(`Triggered "search" option`);
  return ctx.reply(
    'Che tipo di video stai cercando?',
    Markup.keyboard(['🙌🏻 Pov', '🔴 Live', '⭐️ Speciali']).oneTime().resize(),
  );
};

const pov = () => (ctx: Context) => {
  debug(`Triggered "pov" option`);
  return ctx.reply(
    'Di quale personaggio?',
    Markup.keyboard([
      ['🧔🏼🦁 Tyrion', '🧔🏻🐺 Eddard', '🌹🐺 Sansa'],
      ['👩🏼⚔️ Brienne', '🧔‍♂️🦁 Jaime', '👩🏼🦁 Cersei'],
      ['🔙 Torna alla scelta video', '❌ Chiudi'],
    ])
      .oneTime()
      .resize(),
  );
};

const getVideosPov = (character: string) => async (ctx: Context) => {
  debug(`Triggered "getVideosPov" option`);
  const data = await getVideoByCharacter(character);
  if (data) {
    const keyboard = Markup.inlineKeyboard(
      data
        .map((v: any) =>
          Markup.button.callback(
            v.attributes.title,
            videoData.create({
              id: v.attributes.idYoutube,
              action: 'open',
            }),
          ),
        )
        .reduce(function (result: any, value: any, index: any, array: any) {
          if (index % 1 === 0) result.push(array.slice(index, index + 1));
          return result;
        }, []),
    ).resize();

    return ctx.reply(
      `Ecco tutti gli episodi che ho trovato per ${character}`,
      keyboard,
    );
  } else {
    return ctx.reply(`Oooops! Non ho trovato video per ${character}`);
  }
};

const openVideo = () => (ctx: Context) => {
  const { id } = videoData.parse(deunionize(ctx.callbackQuery)!.data!);
  return ctx.reply(`https://www.youtube.com/watch?v=${id}`);
};

const schedule = () => (ctx: Context) => {
  debug(`Triggered "search" option`);
  return ctx.reply('COOMING SOON schedule del canale');
};

const social = () => (ctx: Context) => {
  debug(`Triggered "social" option`);
  const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Facebook', 'facebook'),
    Markup.button.callback('Twitter', 'twitter'),
    Markup.button.callback('Instagram', 'instagram'),
  ]);

  return ctx.reply(`Link social`, inlineMessageRatingKeyboard);
};

const facebook = () => (ctx: Context) => {
  return ctx.reply(`https://www.facebook.com/tronodispadepod/`);
};

const twitter = () => (ctx: Context) => {
  return ctx.reply(`https://twitter.com/tronodispadepod`);
};

const instagram = () => (ctx: Context) => {
  return ctx.reply(`https://www.instagram.com/tronodispadepod/`);
};

export default {
  video,
  last,
  search,
  pov,
  getVideosPov,
  openVideo,
  schedule,
  social,
  facebook,
  twitter,
  instagram,
};
