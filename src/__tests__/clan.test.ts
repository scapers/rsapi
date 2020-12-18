import { Clan, Player } from '../api/runescape/runescape.api';
import { Profile } from '../api/runescape/player/player.models';

test(`Get a clan member list`, async () => {
  const result = await Clan.getMembers('maximized');
  expect(result).toBeDefined();
  expect(result).toBeInstanceOf(Array);
  console.log('clan', result);
});
