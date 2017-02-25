'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hubpressCorePlugins = require('hubpress-core-plugins');

var _hubpressCorePlugins2 = _interopRequireDefault(_hubpressCorePlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Config
function fireRequestConfig(opts) {
  return _hubpressCorePlugins2.default.fire('requestConfig', opts);
}

function fireReceiveConfig(opts) {
  return _hubpressCorePlugins2.default.fire('receiveConfig', opts);
}

function fireRequestSaveConfig(opts) {
  return _hubpressCorePlugins2.default.fire('requestSaveConfig', opts);
}

function fireReceiveSaveConfig(opts) {
  return _hubpressCorePlugins2.default.fire('receiveSaveConfig', opts);
}

// Theme
function fireRequestTheme(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:request-theme', opts);
}

function fireReceiveTheme(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:receive-theme', opts);
}

// SavedAuth
function fireRequestSavedAuth(opts) {
  return _hubpressCorePlugins2.default.fire('requestSavedAuth', opts);
}

function fireReceiveSavedAuth(opts) {
  return _hubpressCorePlugins2.default.fire('receiveSavedAuth', opts);
}

// Remote Synchronization
function fireRequestRemoteSynchronization(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:request-remote-synchronization', opts);
}

function fireReceiveRemoteSynchronization(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:receive-remote-synchronization', opts);
}

function fireRequestSaveRemotePost(opts) {
  return _hubpressCorePlugins2.default.fire('requestSaveRemotePost', opts);
}

function fireReceiveSaveRemotePost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveSaveRemotePost', opts);
}

function fireRequestPublishPost(opts) {
  return _hubpressCorePlugins2.default.fire('requestPublishPost', opts);
}

function fireReceivePublishPost(opts) {
  return _hubpressCorePlugins2.default.fire('receivePublishPost', opts);
}

function fireRequestLocalPublishedPosts(opts) {
  return _hubpressCorePlugins2.default.fire('requestLocalPublishedPosts', opts);
}

function fireReceiveLocalPublishedPosts(opts) {
  return _hubpressCorePlugins2.default.fire('receiveLocalPublishedPosts', opts);
}

// Rendering
function fireRequestRenderingDocuments(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:request-rendering-documents', opts);
}

function fireReceiveRenderingDocuments(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:receive-rendering-documents', opts);
}

function fireRequestRenderingPost(opts) {
  return _hubpressCorePlugins2.default.fire('requestRenderingPost', opts);
}

function fireReceiveRenderingPost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveRenderingPost', opts);
}

// Local
function fireRequestLocalSynchronization(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:request-local-synchronization', opts);
}

function fireReceiveLocalSynchronization(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:receive-local-synchronization', opts);
}

// Local Posts
function fireRequestLocalPosts(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:request-local-posts', opts);
}

function fireReceiveLocalPosts(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:receive-local-posts', opts);
}

function fireRequestLocalPost(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:request-local-post', opts);
}

function fireReceiveLocalPost(opts) {
  return _hubpressCorePlugins2.default.fire('hubpress:receive-local-post', opts);
}

function fireRequestDeleteLocalPost(opts) {
  return _hubpressCorePlugins2.default.fire('requestDeleteLocalPost', opts);
}

function fireReceiveDeleteLocalPost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveDeleteLocalPost', opts);
}

function fireRequestSaveLocalPost(opts) {
  return _hubpressCorePlugins2.default.fire('requestSaveLocalPost', opts);
}

function fireReceiveSaveLocalPost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveSaveLocalPost', opts);
}

// Selected Post
function fireRequestSelectedPost(opts) {
  return _hubpressCorePlugins2.default.fire('requestSelectedPost', opts);
}

function fireReceiveSelectedPost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveSelectedPost', opts);
}

// Authentication
function fireRequestAuthentication(opts) {
  return _hubpressCorePlugins2.default.fire('requestAuthentication', opts);
}

function fireReceiveAuthentication(opts) {
  // Do not fire event if OTP is required
  if (opts.nextState.twoFactorRequired) {
    return payload;
  }

  return _hubpressCorePlugins2.default.fire('receiveAuthentication', opts);
}

function fireRequestLogout(opts) {
  return _hubpressCorePlugins2.default.fire('requestLogout', opts);
}

function fireReceiveLogout(opts) {
  return _hubpressCorePlugins2.default.fire('receiveLogout', opts);
}

// Generators
function fireRequestGenerateIndex(opts) {
  return _hubpressCorePlugins2.default.fire('requestGenerateIndex', opts);
}

function fireReceiveGenerateIndex(opts) {
  return _hubpressCorePlugins2.default.fire('receiveGenerateIndex', opts);
}

function fireRequestGeneratePost(opts) {
  return _hubpressCorePlugins2.default.fire('requestGeneratePost', opts);
}

function fireReceiveGeneratePost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveGeneratePost', opts);
}

function fireRequestGeneratePosts(opts) {
  return _hubpressCorePlugins2.default.fire('requestGeneratePosts', opts);
}

function fireReceiveGeneratePosts(opts) {
  return _hubpressCorePlugins2.default.fire('receiveGeneratePosts', opts);
}

function fireRequestGenerateTags(opts) {
  return _hubpressCorePlugins2.default.fire('requestGenerateTags', opts);
}

function fireReceiveGenerateTags(opts) {
  return _hubpressCorePlugins2.default.fire('receiveGenerateTags', opts);
}

function fireRequestGenerateAuthors(opts) {
  return _hubpressCorePlugins2.default.fire('requestGenerateAuthors', opts);
}

function fireReceiveGenerateAuthors(opts) {
  return _hubpressCorePlugins2.default.fire('receiveGenerateAuthors', opts);
}

function fireRequestSaveRemotePublishedElements(opts) {
  return _hubpressCorePlugins2.default.fire('requestSaveRemotePublishedElements', opts);
}

function fireReceiveSaveRemotePublishedElements(opts) {
  return _hubpressCorePlugins2.default.fire('receiveSaveRemotePublishedElements', opts);
}

function fireRequestDeleteRemotePublishedPost(opts) {
  return _hubpressCorePlugins2.default.fire('requestDeleteRemotePublishedPost', opts);
}

function fireReceiveDeleteRemotePublishedPost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveDeleteRemotePublishedPost', opts);
}

function fireRequestDeleteRemotePost(opts) {
  return _hubpressCorePlugins2.default.fire('requestDeleteRemotePost', opts);
}

function fireReceiveDeleteRemotePost(opts) {
  return _hubpressCorePlugins2.default.fire('receiveDeleteRemotePost', opts);
}

exports.default = {
  fireRequestConfig: fireRequestConfig,
  fireReceiveConfig: fireReceiveConfig,
  fireRequestSaveConfig: fireRequestSaveConfig,
  fireReceiveSaveConfig: fireReceiveSaveConfig,
  fireRequestTheme: fireRequestTheme,
  fireReceiveTheme: fireReceiveTheme,
  fireRequestSavedAuth: fireRequestSavedAuth,
  fireReceiveSavedAuth: fireReceiveSavedAuth,
  fireRequestRemoteSynchronization: fireRequestRemoteSynchronization,
  fireReceiveRemoteSynchronization: fireReceiveRemoteSynchronization,
  fireRequestRenderingDocuments: fireRequestRenderingDocuments,
  fireReceiveRenderingDocuments: fireReceiveRenderingDocuments,
  fireRequestRenderingPost: fireRequestRenderingPost,
  fireReceiveRenderingPost: fireReceiveRenderingPost,
  fireRequestLocalSynchronization: fireRequestLocalSynchronization,
  fireReceiveLocalSynchronization: fireReceiveLocalSynchronization,
  fireRequestLocalPosts: fireRequestLocalPosts,
  fireReceiveLocalPosts: fireReceiveLocalPosts,
  fireRequestLocalPost: fireRequestLocalPost,
  fireReceiveLocalPost: fireReceiveLocalPost,
  fireRequestDeleteLocalPost: fireRequestDeleteLocalPost,
  fireReceiveDeleteLocalPost: fireReceiveDeleteLocalPost,
  fireRequestSaveLocalPost: fireRequestSaveLocalPost,
  fireReceiveSaveLocalPost: fireReceiveSaveLocalPost,
  fireRequestSaveRemotePost: fireRequestSaveRemotePost,
  fireReceiveSaveRemotePost: fireReceiveSaveRemotePost,
  fireRequestPublishPost: fireRequestPublishPost,
  fireReceivePublishPost: fireReceivePublishPost,
  fireRequestLocalPublishedPosts: fireRequestLocalPublishedPosts,
  fireReceiveLocalPublishedPosts: fireReceiveLocalPublishedPosts,
  fireRequestSelectedPost: fireRequestSelectedPost,
  fireReceiveSelectedPost: fireReceiveSelectedPost,
  fireRequestAuthentication: fireRequestAuthentication,
  fireReceiveAuthentication: fireReceiveAuthentication,
  fireRequestLogout: fireRequestLogout,
  fireReceiveLogout: fireReceiveLogout,
  fireRequestGenerateIndex: fireRequestGenerateIndex,
  fireReceiveGenerateIndex: fireReceiveGenerateIndex,
  fireRequestGeneratePost: fireRequestGeneratePost,
  fireReceiveGeneratePost: fireReceiveGeneratePost,
  fireRequestGeneratePosts: fireRequestGeneratePosts,
  fireReceiveGeneratePosts: fireReceiveGeneratePosts,
  fireRequestGenerateTags: fireRequestGenerateTags,
  fireReceiveGenerateTags: fireReceiveGenerateTags,
  fireRequestGenerateAuthors: fireRequestGenerateAuthors,
  fireReceiveGenerateAuthors: fireReceiveGenerateAuthors,
  fireRequestSaveRemotePublishedElements: fireRequestSaveRemotePublishedElements,
  fireReceiveSaveRemotePublishedElements: fireReceiveSaveRemotePublishedElements,
  fireRequestDeleteRemotePublishedPost: fireRequestDeleteRemotePublishedPost,
  fireReceiveDeleteRemotePublishedPost: fireReceiveDeleteRemotePublishedPost,
  fireRequestDeleteRemotePost: fireRequestDeleteRemotePost,
  fireReceiveDeleteRemotePost: fireReceiveDeleteRemotePost
};