import R from 'ramda';
import { GroupModel } from '../utils/db';

export const getAllGroups = R.pipe(
  () => ({
    include: ['venue'],
  }),
  R.bind(GroupModel.findAll, GroupModel),
);

export const getGroupById = R.bind(GroupModel.findById, GroupModel);

export const createGroup = data => GroupModel.create(data);
