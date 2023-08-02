import { Player } from '../api/runescape/runescape.api';
import { GameMode, Profile } from '../api/runescape/player/player.api';
import {QuestStatus, RawProfile} from '../api/runescape/player/player.models';

const normalDisplay = 'sync';
const ironmanDisplay = 'syncing';

test(`Full player object`, async () => {
  const result = await Player.getPlayer(normalDisplay);
  expect(result).toBeDefined();
  expect(result.display.toLowerCase() === normalDisplay);
});

test(`Player's RuneMetric profile`, async () => {
  const result = await Player.getProfile(normalDisplay);
  expect(result).toBeDefined();
  expect(result).toBeInstanceOf(Profile);
  expect(result.display.toLowerCase() === normalDisplay);
});
/*
test(`Normal player's hiscore as profile`, async () => {
  const result = await Player.getHiscore(normalDisplay);
  expect(result).toBeDefined();
  expect(result).toBeInstanceOf(Profile);
  expect(result.display.toLowerCase() === normalDisplay);
});

test(`Ironman player's hiscore as profile`, async () => {
  const result = await Player.getHiscore(ironmanDisplay, GameMode.Ironman);
  expect(result).toBeDefined();
  expect(result).toBeInstanceOf(Profile);
  expect(result.display.toLowerCase() === ironmanDisplay);
});

test(`Player's RuneMetric profile`, async () => {
  const result = await Player.getProfile(normalDisplay);
  expect(result).toBeDefined();
  expect(result).toBeInstanceOf(Profile);
  expect(result.display.toLowerCase() === normalDisplay);
});

test(`Player's quest log`, async () => {
  const result = await Player.getQuests(normalDisplay);
  expect(result).toBeDefined();
  expect(result.find((q) => q.name.toLowerCase() === `cold war`).status === QuestStatus.COMPLETED);
});

test(`Player's UUID`, async () => {
  const result = await Player.getUUID('Staw Hat');
  expect(result).toBeDefined();
});
test(`Player's UUID where no boss scores`, async () => {
  const result = await Player.getUUID('Irri');
  expect(result).toBeDefined();
});*/
