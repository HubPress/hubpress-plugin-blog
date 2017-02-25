'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fires = require('./fires');

var _fires2 = _interopRequireDefault(_fires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticate(opts) {
  return _fires2.default.fireRequestAuthentication(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveAuthentication(updatedOpts);
  });
}

exports.default = {
  authenticate: authenticate
};