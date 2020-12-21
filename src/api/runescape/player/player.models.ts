export interface RawProfile {
  activities: Event[];
  skillvalues: RawSkill[];
  magic: number;
  questsstarted: number;
  totalskill: number;
  questsnotstarted: number;
  totalxp: number;
  ranged: number;
  name: string;
  rank: string;
  melee: number;
  combatlevel: number;
  loggedIn: string;
  error: string;
}

export interface RawSkill {
  level: number;
  xp: number;
  rank: number;
  id: number;
}

export class Skill {
  name: string;
  level: number;
  experience: number;
  rank: number;

  constructor(name?: string, level?: number, experience?: number, rank?: number) {
    this.name = name || '';
    this.level = level || -1;
    this.experience = experience || -1;
    this.rank = rank || -1;
  }
}

export class Skills {
  overall: Skill = new Skill();
  attack: Skill = new Skill();
  defence: Skill = new Skill();
  strength: Skill = new Skill();
  hitpoints: Skill = new Skill();
  ranged: Skill = new Skill();
  prayer: Skill = new Skill();
  magic: Skill = new Skill();
  cooking: Skill = new Skill();
  woodcutting: Skill = new Skill();
  fletching: Skill = new Skill();
  fishing: Skill = new Skill();
  firemaking: Skill = new Skill();
  crafting: Skill = new Skill();
  smithing: Skill = new Skill();
  mining: Skill = new Skill();
  herblore: Skill = new Skill();
  agility: Skill = new Skill();
  thieving: Skill = new Skill();
  slayer: Skill = new Skill();
  farming: Skill = new Skill();
  runecrafting: Skill = new Skill();
  hunter: Skill = new Skill();
  construction: Skill = new Skill();
  summoning: Skill = new Skill();
  dungeoneering: Skill = new Skill();
  divination: Skill = new Skill();
  invention: Skill = new Skill();
  archaeology: Skill = new Skill();

  [key: string]: Skill;
}

export class Event {
  date: Date | string;
  details: string;
  text: string;

  constructor(date?: Date, details?: string, text?: string) {
    this.date = date || new Date();
    this.details = details || '';
    this.text = text || '';
  }
}

export class Activity {
  rank: number;
  total: number;

  constructor(rank?: number, total?: number) {
    this.rank = rank || -1;
    this.total = total || -1;
  }
}

export class Activities {
  easyClueScrolls: Activity = new Activity();
  mediumClueScrolls: Activity = new Activity();
  hardClueScrolls: Activity = new Activity();
  eliteClueScrolls: Activity = new Activity();
  masterClueScrolls: Activity = new Activity();

  [key: string]: Activity;
}

export class Profile {
  display: string;
  events: Event[];
  skills: Skills;
  activities: Activities;
  errors: string[];

  constructor(display?: string, events?: Event[], skills?: Skills, activities?: Activities) {
    this.display = display || '';
    this.events = events || [];
    this.skills = skills || new Skills();
    this.activities = activities || new Activities();
  }
}

export class Quest {
  constructor(quest: any) {
    this.name = quest.title;
    this.status = QuestStatus[quest.status as string];
    this.difficulty = quest.difficulty;
    this.isMembers = quest.members;
    this.questPoints = quest.questPoints;
    this.isEligible = quest.userEligible;
  }

  name: string;
  status: QuestStatus;
  difficulty: number;
  isMembers: boolean;
  questPoints: number;
  isEligible: boolean;
}

export enum QuestStatus {
  NOT_STARTED,
  STARTED,
  COMPLETED,
}
