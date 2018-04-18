import R from 'ramda';
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import Joi from 'joi';
import { create, getAll } from '../controllers/users';

const joiSchema = Joi.object().keys({
  email: Joi.string().email(),
  username: Joi.string(),
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User of the system',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the user',
      // resolve() {
      //   return 'user1';
      // },
      // args?: GraphQLFieldConfigArgumentMap;
      // resolve?: GraphQLFieldResolveFn;
      // deprecationReason?: string;
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email',
      // resolve() {
      //   return 'email@email';
      // },
    },
  },
});

export default User;

export const usersResolve = R.pipeP(
  getAll,
  R.map(u => u.toJSON()),
);

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Input user payload',
  fields: () => ({
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const userMutations = {
  createUser: {
    type: User,
    args: {
      input: {
        type: new GraphQLNonNull(UserInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const { error } = Joi.validate(input, joiSchema);
      if (error) {
        throw error;
      }
      return create(input);
    },
  },
};
