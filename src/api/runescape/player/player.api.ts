import got from 'got';
import { GameMode, player } from '../../../configs/runescape.constants';
import { Profile, Quest, RawProfile } from './player.models';
import { JagexParsers } from '../../../utils/jagex.parsers';

const parsers = new JagexParsers();

const getHiscoreEndpoint = (gameMode): string => {
  switch (gameMode) {
    case GameMode.Ironman:
      return player.endpoints.ironman;
    case GameMode.Hardcore:
      return player.endpoints.hardcore;
    default:
      return player.endpoints.hiscore;
  }
};

/**
 * Get full player breakdown. This function can make a request to both RuneMetrics and the Hiscores to populate
 * all known player data including skills, events, and activities (clues).
 * @param display
 */
export const getPlayer = async (display: string): Promise<Profile> => {
  const profile = await getProfile(display);
  const hiscores = await getHiscore(display);
  if (profile && profile.errors && profile.errors.length > 0) {
    return { ...hiscores, events: [] } as Profile;
  }
  return { ...hiscores, ...profile } as Profile;
};

/**
 * Get player's RuneMetrics profile. This will fail if the user has their RuneMetrics on private.
 * @param display
 */
export const getProfile = async (display: string): Promise<Profile> => {
  try {
    const p = await got(player.endpoints.profile, {
      searchParams: {
        user: display,
        activities: 20,
      },
    }).json<RawProfile>();
    return parsers.parseProfile(p);
  } catch (e) {
    return { ...new Profile(), errors: [e.toString()] } as Profile;
  }
};

/**
 * Get player's Hiscore.
 * @param display
 * @param gameMode
 */
export const getHiscore = async (display: string, gameMode: GameMode = GameMode.Normal): Promise<Profile> => {
  try {
    const data = await got(`${getHiscoreEndpoint(gameMode)}`, {
      searchParams: { player: display },
    });
    const b = `
    1739,2898,5600000000
      1255,99,200000000
      1867,99,200000000
      1186,99,200000000
      1419,99,200000000
      1919,99,200000000
      3667,99,200000000
      2008,99,200000000
      3451,99,200000000
      3383,99,200000000
      3167,99,200000000
      4652,99,200000000
      4976,99,200000000
      2980,99,200000000
      4240,99,200000000
      5133,99,200000000
      5433,120,200000000
      3147,99,200000000
      5963,99,200000000
      642,120,200000000
      8261,120,200000000
      2182,99,200000000
      3930,99,200000000
      3363,99,200000000
      1133,99,200000000
      5392,120,200000000
      2902,99,200000000
      716,120,200000000
      10953,120,200000000
      100,99,14000000
      -1,-1
      -1,-1
      17845,4678987
      -1,-1
      -1,-1
      34100,1561
      26172,1418
      29853,1420
      39062,1751
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      -1,-1
      123852,9
      -1,-1
      -1,-1
      2466,26610
      35022,54
      100180,5
      6481,1364
      2053,1594
      3145,506
    `
    return parsers.parseHiscore(display, b);
  } catch (e) {
    return { ...new Profile(), errors: [e.toString()] } as Profile;
  }
};

/**
 * Get player's Quests
 * @param display
 */
export const getQuests = async (display: string): Promise<Quest[]> => {
  try {
    const response = await got(player.endpoints.quests, {
      searchParams: {
        user: display,
      },
    }).json<JagexQuests>();
    return response.quests.map((q) => new Quest(q));
  } catch (e) {
    throw Error(e);
  }
};

export const getUUID = async (display: string): Promise<any> => {
  try {
    const result = await got(player.endpoints.boss, {
      searchParams: {
        name: display,
      },
    }).json();
    if (Array.isArray(result)) {
      const member = result[0].members.find(
        (x) => x.name.replace(/\s/g, '-').toLowerCase() === display.replace(/\s/g, '-').toLowerCase(),
      );
      return member.id;
    }
    return -1;
  } catch (e) {
    const uuid = parseInt(
      JSON.parse(e.response.body)
        .message.replace('User with id: ', '')
        .replace(' could not be found in any groups. ', '')
        .trim(),
      10,
    );
    return uuid;
  }
};

interface JagexQuests {
  quests: Quest[];
}

export { Profile, Activities, Skills, Activity, Event, Skill } from './player.models';
export { GameMode };
