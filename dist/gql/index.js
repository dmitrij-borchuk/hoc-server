'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _graphql = require('graphql');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _constants = require('../constants');

var _acl = require('../acl');

var _acl2 = _interopRequireDefault(_acl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: (0, _graphql.GraphQLList)(_user2.default),
        resolve: function resolve() {
          var context = arguments.length <= 2 ? undefined : arguments[2];
          var roles = context.auth.credentials.roles;

          var actions = _ramda2.default.pipe(function (role) {
            return [role];
          }, _ramda2.default.map(_ramda2.default.path(_ramda.__, _acl2.default)), _ramda2.default.reduce(_ramda2.default.concat, []), _ramda2.default.uniq)(roles);

          var hasAccess = _ramda2.default.contains(_constants.ACTIONS.SEE_ALL_USERS, actions);

          if (hasAccess) {
            return (0, _user.usersResolve)();
          }
          throw new Error('Access denied');
        }
      },
      hello: {
        type: _graphql.GraphQLString,
        resolve: function resolve() {
          return 'world';
        }
      }
    }
  }),
  mutation: new _graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: _user.userMutations
  })
});

exports.default = function (query) {
  return (0, _graphql.graphql)(schema, query);
};