import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import user, { usersResolve } from './user';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: GraphQLList(user),
        resolve: usersResolve,
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
