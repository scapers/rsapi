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

    return parsers.parseHiscore(display, data.body);
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
