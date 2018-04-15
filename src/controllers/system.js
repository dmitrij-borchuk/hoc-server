import R from 'ramda';
import { SystemModel } from '../utils/db';

export const getByKey = R.pipe(
  key => ({ where: { key } }),
  R.bind(SystemModel.findOne, SystemModel),
);

export const set = R.curry(async (model, data) => {
  const instance = await model.findOne({ where: { key: data.key } });

  if (instance) {
    return instance.update(data);
  }

  return model.create(data);
})(SystemModel);

