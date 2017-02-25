'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fires = require('./fires');

var _fires2 = _interopRequireDefault(_fires);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialize(opts) {
  return _fires2.default.fireRequestTheme(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveTheme(updatedOpts);
  }).then(function (updatedOpts) {
    if (localStorage.getItem('hubpress:sync')) return _fires2.default.fireRequestLocalPosts(updatedOpts).then(function (payload) {
      return _fires2.default.fireReceiveLocalPosts(updatedOpts);
    });

    return synchronize(updatedOpts);
  });
}

function synchronize(opts) {
  return _fires2.default.fireRequestRemoteSynchronization(opts).then(function (payload) {
    return _fires2.default.fireReceiveRemoteSynchronization(opts);
  }).then(function (payload) {
    return _fires2.default.fireRequestRenderingDocuments(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveRenderingDocuments(opts);
  }).then(function (payload) {
    return _fires2.default.fireRequestLocalSynchronization(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveLocalSynchronization(opts);
  }).then(function (payload) {
    return _fires2.default.fireRequestLocalPosts(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveLocalPosts(opts);
  }).then(function (payload) {
    localStorage.setItem('hubpress:sync', (0, _moment2.default)().format());
    return payload;
  });
};

exports.default = {
  initialize: initialize,
  synchronize: synchronize
};