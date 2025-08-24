import { CurrentUser, TeamCreateRequest, TeamResponse, TeamUpdateRequest } from '@workspace/models-client';
import { errorCreator } from '@workspace/models-client/utils';

import { teamRepository } from '@/repositories';

export const create = async (data: TeamCreateRequest): Promise<TeamResponse> => {
  return await teamRepository.create(data);
};

export const getById = async (currentUser: CurrentUser, id: number): Promise<TeamResponse> => {
  const team = await teamRepository.getById(currentUser.slackTeamId, id);

  if (!team) {
    throw errorCreator.notFoundError(`Team with ID ${id} not found`, 'team');
  }

  return team;
};

export const getBySlackTeamId = async (currentUser: CurrentUser, slackTeamId: string): Promise<TeamResponse> => {
  if (currentUser.slackTeamId !== slackTeamId) {
    throw errorCreator.forbiddenError('You do not have permission to get this team');
  }

  const team = await teamRepository.getBySlackTeamId(slackTeamId);

  if (!team) {
    throw errorCreator.notFoundError(`Team with Slack Team ID ${slackTeamId} not found`, 'team');
  }

  return team;
};

export const getAll = async (): Promise<TeamResponse[]> => {
  return await teamRepository.getAll();
};

export const updateSlackTeamName = async (
  currentUser: CurrentUser,
  targetTeamId: number,
  data: TeamUpdateRequest
): Promise<TeamResponse> => {
  if (currentUser.teamId !== targetTeamId) {
    throw errorCreator.forbiddenError('You do not have permission to update this team');
  }

  return await teamRepository.update(targetTeamId, data);
};

export const remove = async (currentUser: CurrentUser, targetTeamId: number): Promise<void> => {
  if (currentUser.teamId !== targetTeamId) {
    throw errorCreator.forbiddenError('You do not have permission to remove this team');
  }

  return await teamRepository.remove(targetTeamId);
};
