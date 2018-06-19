import R from 'ramda';
import { GroupModel } from '../utils/db';

export const getAllGroups = R.pipe(
  () => ({
    include: [
      'venue',
      'assigneeFull',
    ],
  }),
  R.bind(GroupModel.findAll, GroupModel),
);

export const getGroupById = id => GroupModel.findById(id, {
  include: ['assigneeFull'],
});

export const createGroup = data => GroupModel.create(data);

export const editGroup = async (id, data) => {
  const group = await getGroupById(id);
  return group.update(data);
};
