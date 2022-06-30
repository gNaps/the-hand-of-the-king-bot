import { getRandomCharacter, getRandomHouse } from '../../api/character.api';
import createDebug from 'debug';
import { Context } from 'telegraf';

const debug = createDebug('bot:about_command');

const character = () => async (ctx: Context) => {
  debug(`Triggered "character" command`);
  const character = await getRandomCharacter();
  console.log(character);
  return ctx.reply(
    `
${character.name} 
Titolo: ${character.titles[0] ? `${character.titles[0]}` : '--'}
Conosciuto come: ${character.aliases[0] ? `${character.aliases[0]}` : '--'}
Cultura: ${character.culture ? `${character.culture}` : '--'}
Nato: ${character.born ? `${character.born}` : '--'}
Morte: ${character.died ? `${character.died}` : '--'}
Padre: ${character.father ? `${character.father}` : '--'}
Madre: ${character.mother ? `${character.mother}` : '--'}

https://awoiaf.westeros.org/index.php/${character.name.replace(/\s/g, '_')}
`,
  );
};

const house = () => async (ctx: Context) => {
  debug(`Triggered "house" command`);
  const house = await getRandomHouse();
  return ctx.reply(
    `
${house.name} 
Regione: ${house.region ? `${house.region}` : '--'}
Sigillo: ${house.coatOfArms ? `${house.coatOfArms}` : '--'}
Motto: ${house.words ? `${house.words}` : '--'}
Titolo: ${house.titles[0] ? `${house.titles[0]}` : '--'}
Castello: ${house.seats[0] ? `${house.seats[0]}` : '--'}
Spade: ${
      house.ancestralWeapons[0] ? `${house.ancestralWeapons.join(',')}` : '--'
    }`,
  );
};

export default { character, house };
