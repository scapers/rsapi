import got from 'got';
import {GameMode, player} from '../../../configs/runescape.constants';
import {Profile, Quest, RawProfile} from './player.models';
import {JagexParsers} from '../../../utils/jagex.parsers'

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
}

/**
 * Get full player breakdown. This function can make a request to both RuneMetrics and the Hiscores to populate
 * all known player data including skills, events, and activities (clues).
 * @param display
 */
export const getPlayer = async (display: string): Promise<Profile> => {
  return {...await getHiscore(display), ...await getProfile(display)} as Profile;
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
        activities: 20
      }
    }).json<RawProfile>();
    return parsers.parseProfile(p);
  } catch (e) {
    return {...new Profile(), errors: [e]} as Profile;
  }
}

/**
 * Get player's Hiscore.
 * @param display
 * @param gameMode
 */
export const getHiscore = async (display: string, gameMode: GameMode = GameMode.Normal): Promise<Profile> => {
  try {
    let data = await got(`${getHiscoreEndpoint(gameMode)}`,
      {
        searchParams:
          {player: display}
      });
    return parsers.parseHiscore(display, data.body);
  } catch (e) {
    return {...new Profile(), errors: [e]} as Profile;
  }

}

export const getQuests = async (display: string): Promise<Quest[]> => {
  try {
    const response = await got(player.endpoints.quests, {
      searchParams: {
        user: display
      }
    }).json<JagexQuests>();
    return response.quests.map(q => new Quest(q))
  } catch (e) {
    throw Error(e);
  }
}

interface JagexQuests {
  quests: Quest[];
}

export {Profile, Activities, Skills, Activity, Event, Skill} from './player.models';
export {GameMode};
