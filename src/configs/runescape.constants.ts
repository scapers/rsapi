export const player = {
  endpoints: {
    profile: 'https://apps.runescape.com/runemetrics/profile/profile',
    hiscore: 'https://secure.runescape.com/m=hiscore/index_lite.ws',
    ironman: 'https://secure.runescape.com/m=hiscore_ironman/index_lite.ws',
    hardcore: 'https://secure.runescape.com/m=hiscore_hardcore_ironman/index_lite.ws',
    quests: 'https://apps.runescape.com/runemetrics/quests',
    boss: 'https://secure.runescape.com/m=group_hiscores/v1/players',
  },
};
export const clan = {
  endpoints: {
    members: 'http://services.runescape.com/m=clan-hiscores/members_lite.ws',
  },
};

export const skillIds: any[] = [
  { id: 0, name: 'Attack' },
  { id: 1, name: 'Defence' },
  { id: 2, name: 'Strength' },
  { id: 3, name: 'Hitpoints' },
  { id: 4, name: 'Ranged' },
  { id: 5, name: 'Prayer' },
  { id: 6, name: 'Magic' },
  { id: 7, name: 'Cooking' },
  { id: 8, name: 'Woodcutting' },
  { id: 9, name: 'Fletching' },
  { id: 10, name: 'Fishing' },
  { id: 11, name: 'Firemaking' },
  { id: 12, name: 'Crafting' },
  { id: 13, name: 'Smithing' },
  { id: 14, name: 'Mining' },
  { id: 15, name: 'Herblore' },
  { id: 16, name: 'Agility' },
  { id: 17, name: 'Thieving' },
  { id: 18, name: 'Slayer' },
  { id: 19, name: 'Farming' },
  { id: 20, name: 'Runecrafting' },
  { id: 21, name: 'Hunter' },
  { id: 22, name: 'Construction' },
  { id: 23, name: 'Summoning' },
  { id: 24, name: 'Dungeoneering' },
  { id: 25, name: 'Divination' },
  { id: 26, name: 'Invention' },
  { id: 27, name: 'Archaeology' },
];
export const activities: any[] = [
  { index: 54, name: 'easyClueScrolls' },
  { index: 55, name: 'mediumClueScrolls' },
  { index: 56, name: 'hardClueScrolls' },
  { index: 57, name: 'eliteClueScrolls' },
  { index: 58, name: 'masterClueScrolls' },
];

export enum GameMode {
  Normal,
  Ironman,
  Hardcore,
}
