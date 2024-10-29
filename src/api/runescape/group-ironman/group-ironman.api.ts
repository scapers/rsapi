import got from 'got';
import { groupIronman } from '../../../configs/runescape.constants';
import { GroupScoreDetails, GroupsResult, Props } from './group-ironman.models';

export const getGroups = async (
  groupSize: number,
  page: number,
  pageSize: number,
  isCompetitive: boolean | undefined = undefined,
): Promise<GroupsResult> => {
  try {
    const params: Record<string, any> = {
      groupSize,
      page,
      pageSize,
      ...(isCompetitive !== undefined && { isCompetitive }),
    };

    return await got(groupIronman.endpoints.hiscore, {
      searchParams: params,
    }).json<GroupsResult>();
  } catch (e) {
    return {
      content: [],
      empty: false,
      first: false,
      last: false,
      numberOfElements: 0,
      pageNumber: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
      errors: [e.toString()],
    };
  }
};

export const getGroup = async (groupName: string, groupSize: number): Promise<GroupScoreDetails> => {
  try {
    const url = `${groupIronman.endpoints.group}/${groupSize}-player/${groupName}.json`;

    const result = await got(url).json<Props>();
    const groupScoreDetails: GroupScoreDetails = result.pageProps.groupScoreDetails;

    groupScoreDetails.members.forEach((member) => {
      if (member.contributedXp.constitution !== undefined) {
        member.contributedXp.hitpoints = member.contributedXp.constitution;
      }

      if (member.level.constitution !== undefined) {
        member.level.hitpoints = member.level.constitution;
      }
    });

    return groupScoreDetails;
  } catch (e) {
    return { errors: [e.toString()] } as GroupScoreDetails;
  }
};
