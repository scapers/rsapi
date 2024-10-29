import { GroupIronman } from '../api/runescape/runescape.api';

test(`Group Hiscore`, async () => {
  const result = await GroupIronman.getGroups(5, 1, 1);
  expect(result).toBeDefined();
});

test(`Specific Group`, async () => {
  const result = await GroupIronman.getGroup('Higher Logic', 5);
  expect(result).toBeDefined();
});
