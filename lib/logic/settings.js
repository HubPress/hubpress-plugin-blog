'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fires = require('./fires');

var _fires2 = _interopRequireDefault(_fires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function refreshAfterSavedConfig(opts) {
  return _fires2.default.fireRequestTheme(opts).then(function (payload) {
    return _fires2.default.fireReceiveTheme(opts);
  })

  // Get publishedPosts to rebuild all content
  .then(function (payload) {
    return _fires2.default.fireRequestLocalPublishedPosts(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveLocalPublishedPosts(opts);
  })
  // Generate Index / Tags
  .then(function (payload) {
    console.time('Build content');
    return payload;
  }).then(function (payload) {
    return _fires2.default.fireRequestGenerateIndex(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveGenerateIndex(opts);
  }).then(function (payload) {
    return _fires2.default.fireRequestGeneratePosts(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveGeneratePosts(opts);
  }).then(function (payload) {
    return _fires2.default.fireRequestGenerateTags(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveGenerateTags(opts);
  }).then(function (payload) {
    return _fires2.default.fireRequestGenerateAuthors(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveGenerateAuthors(opts);
  }).then(function (payload) {
    console.timeEnd('Build content');
    return payload;
  }).then(function (payload) {
    return _fires2.default.fireRequestSaveRemotePublishedElements(opts);
  }).then(function (payload) {
    return _fires2.default.fireReceiveSaveRemotePublishedElements(opts);
  });
}

exports.default = {
  refreshAfterSavedConfig: refreshAfterSavedConfig
};