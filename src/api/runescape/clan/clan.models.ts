export class ClanMember {
  display: string;
  rank: string;
  experience: number;
  kills: number;

  constructor(display?: string, rank?: string, experience?: number, kills?: number) {
    this.display = display || '';
    this.rank = rank || '';
    this.experience = experience || -1;
    this.kills = kills || -1;
  }
}
