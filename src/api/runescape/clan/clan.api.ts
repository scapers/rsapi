import got from 'got';
import { clan } from '../../../configs/runescape.constants';
import { ClanMember } from './clan.models';

export const getMembers = async (name: string): Promise<ClanMember[]> => {
  try {
    const data = await got(clan.endpoints.members, {
      searchParams: {
        clanName: name,
      },
    });
    return parser(data.body);
  } catch (e) {
    throw new Error(e);
  }
};

const parser = (raw: any): ClanMember[] => {
  const members: ClanMember[] = [];
  const space = new RegExp(String.fromCharCode(65533), 'g');
  const data = raw.split('\n');
  for (let i = 1; i < data.length; i++) {
    data[i] = data[i].replace(space, ' ');

    const row = data[i].split(',');
    if (row[0] && row[0].length > 0) {
      members.push(new ClanMember(row[0], row[1], Number(row[2]), Number(row[3])));
    }
  }
  return members;
};

export { ClanMember } from './clan.models';
