import { skillIds, activities } from '../configs/runescape.constants';
import { Profile, Activities, Activity, Skill, Skills } from '../api/runescape/player/player.api';
import { RawProfile, RawSkill } from '../api/runescape/player/player.models';
import { ClanMember } from '../api/runescape/clan/clan.api';

// TODO: all of these parsers could use a touchup to utilize es6 so they're a little prettier
export class JagexParsers {
  parseProfile(raw: RawProfile): Profile {
    const profile: Profile = new Profile();
    const skills: Skills = new Skills();
    // normalize skills
    raw.skillvalues.forEach((sv: RawSkill) => {
      // find name
      const skillName: string = skillIds
        .filter((sid) => {
          return sid.id === sv.id;
        })[0]
        .name.toLowerCase();
      skills[skillName] = new Skill(skillName, sv.level, sv.xp / 10, sv.rank);
    });
    skills.overall = new Skill('overall', raw.totalskill, raw.totalxp, Number(raw.rank.replace(',', '')));
    profile.skills = skills;
    profile.events = raw.activities;
    profile.display = raw.name;
    return profile;
  }

  parseHiscore(display: string, raw: string): Profile {
    const profile = new Profile();
    profile.display = display;
    profile.skills = this.hiscoreToSkills(raw);
    profile.activities = this.hiscoreToActivities(raw);
    return profile;
  }

  private hiscoreToSkills(raw: any): Skills {
    const csv: string[] = raw.split('\n');
    const skills: Skills = new Skills();
    const overallCsv = csv[0].split(',');
    skills.overall = new Skill('overall', Number(overallCsv[1]), Number(overallCsv[2]), Number(overallCsv[0]));
    for (let i = 0; i < skillIds.length; i++) {
      const skillName = skillIds[i].name.toLowerCase();
      const skillCsv = csv[i + 1].split(',');
      skills[skillName] = new Skill(skillName, Number(skillCsv[1]), Number(skillCsv[2]), Number(skillCsv[0]));
    }
    return skills;
  }

  private hiscoreToActivities(raw: any): Activities {
    const csv: string[] = raw.split('\n');
    const acts: Activities = new Activities();
    activities.forEach((a) => {
      const activityCsv = csv[a.index].split(',');
      acts[a.name] = new Activity(Number(activityCsv[0]), Number(activityCsv[1]));
    });
    return acts;
  }
}
