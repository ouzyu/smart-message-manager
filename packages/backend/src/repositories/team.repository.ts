import { TeamCreateRequest, TeamResponse, TeamUpdateRequest } from '@workspace/models-client/schemas';
import { errorCreator, handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient } from '@/configs/database.config';

export const create = async (data: TeamCreateRequest): Promise<TeamResponse> => {
  try {
    const team = await prismaClient.team.create({
      data,
    });

    return team;
  } catch (error) {
    handlePrismaError(error, 'create', 'team');
  }
};

export const getById = async (slackTeamId: string, id: number): Promise<TeamResponse | null> => {
  try {
    const team = await prismaClient.team.findUnique({
      where: { id, slackTeamId },
    });

    return team;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getById', 'team');
  }
};

export const getBySlackTeamId = async (slackTeamId: string): Promise<TeamResponse | null> => {
  try {
    const team = await prismaClient.team.findUnique({
      where: { slackTeamId },
    });

    return team;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getBySlackTeamId', 'team');
  }
};

export const getAll = async (): Promise<TeamResponse[]> => {
  try {
    return await prismaClient.team.findMany({});
  } catch (error) {
    handlePrismaError(error, 'getAll', 'team');
  }
};

export const update = async (id: number, data: TeamUpdateRequest): Promise<TeamResponse> => {
  try {
    const team = await prismaClient.team.update({
      where: { id },
      data,
    });

    return team;
  } catch (error) {
    handlePrismaError(error, 'update', 'team');
  }
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prismaClient.team.delete({
      where: { id },
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'remove', 'team');
  }
};
