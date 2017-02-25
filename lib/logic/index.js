'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _initialize = require('./initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _authentication = require('./authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _initialize2.default, _authentication2.default, _posts2.default, _settings2.default);