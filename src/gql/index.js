import R, { __ as _ } from 'ramda';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import user, { usersResolve } from './user';
import { ACTIONS } from '../constants';
import acl from '../acl';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: GraphQLList(user),
        resolve(...rest) {
          const context = rest[2];
          const { roles } = context.auth.credentials;
          const actions = R.pipe(
            role => [role],
            R.map(R.path(_, acl)),
            R.reduce(R.concat, []),
            R.uniq,
          )(roles);

          const hasAccess = R.contains(ACTIONS.SEE_ALL_USERS, actions);

          if (hasAccess) {
            return usersResolve();
          }
          throw new Error('Access denied');
        },
      },
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'RootMutationType',
  //   fields: {
  //     user: userMutations,
  //   },
  // }),
});

export default query => graphql(schema, query);
