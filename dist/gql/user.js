'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userMutations = exports.usersResolve = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _graphql = require('graphql');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _users = require('../controllers/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var joiSchema = _joi2.default.object().keys({
  email: _joi2.default.string().email(),
  username: _joi2.default.string()
});

var User = new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'User of the system',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
    },
    username: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      description: 'Name of the user'
      // resolve() {
      //   return 'user1';
      // },
      // args?: GraphQLFieldConfigArgumentMap;
      // resolve?: GraphQLFieldResolveFn;
      // deprecationReason?: string;
    },
    email: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      description: 'Email'
      // resolve() {
      //   return 'email@email';
      // },
    }
  }
});

exports.default = User;
var usersResolve = exports.usersResolve = _ramda2.default.pipeP(_users.getAll, _ramda2.default.map(function (u) {
  return u.toJSON();
}));

var UserInputType = new _graphql.GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Input user payload',
  fields: function fields() {
    return {
      username: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      email: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    };
  }
});

var userMutations = exports.userMutations = {
  createUser: {
    type: User,
    args: {
      input: {
        type: new _graphql.GraphQLNonNull(UserInputType)
      }
    },
    resolve: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rootValue, _ref) {
        var input = _ref.input;

        var _Joi$validate, error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Joi$validate = _joi2.default.validate(input, joiSchema), error = _Joi$validate.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                throw error;

              case 3:
                return _context.abrupt('return', (0, _users.create)(input));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function resolve(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return resolve;
    }()
  }
};