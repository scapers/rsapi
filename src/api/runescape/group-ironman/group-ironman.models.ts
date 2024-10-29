export interface GroupsResult {
  totalElements: number;
  totalPages: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageNumber: number;
  empty: boolean;
  content: Group[];
  errors: string[];
}

export interface Group {
  id: number;
  name: string;
  groupTotalXp: number;
  groupTotalLevel: number;
  size: number;
  toHighlight: boolean;
  isCompetitive: boolean;
  founder: boolean;
}

export interface Props {
  pageProps: PageProps;
}

export interface PageProps {
  groupScoreDetails: GroupScoreDetails;
}

export interface GroupScoreDetails extends Group {
  livesDepleted: boolean;
  members: GroupMember[];
  errors: string[];
}

export interface GroupMember {
  name: string;
  contributedXp: Skills;
  level: Skills;
}

export interface Skills {
  attack: number;
  defence: number;
  strength: number;
  hitpoints: number;
  constitution: number;
  ranged: number;
  prayer: number;
  magic: number;
  cooking: number;
  woodcutting: number;
  fletching: number;
  fishing: number;
  firemaking: number;
  crafting: number;
  smithing: number;
  mining: number;
  herblore: number;
  agility: number;
  thieving: number;
  slayer: number;
  farming: number;
  runecrafting: number;
  hunter: number;
  construction: number;
  summoning: number;
  dungeoneering: number;
  divination: number;
  invention: number;
  archaeology: number;
  necromancy: number;
}
