'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hubpressPlugin = hubpressPlugin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

var _logic = require('./logic');

var _logic2 = _interopRequireDefault(_logic);

var _About = require('./components/About');

var _About2 = _interopRequireDefault(_About);

var _Post = require('./components/Post');

var _Post2 = _interopRequireDefault(_Post);

var _Posts = require('./components/Posts');

var _Posts2 = _interopRequireDefault(_Posts);

var _Settings = require('./components/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _SettingsSocial = require('./components/SettingsSocial');

var _SettingsSocial2 = _interopRequireDefault(_SettingsSocial);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueCodemirror = require('vue-codemirror');

var _vueCodemirror2 = _interopRequireDefault(_vueCodemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// use
_vue2.default.use(_vueCodemirror2.default);

var APPLICATION_INITIALIZE_PLUGINS = 'application:initialize-plugins';
var HUBPRESS_INITIALIZE = 'hubpress:initialize';
var AUTHORISATION_AUTHENTICATION_DONE = 'authorisation:authentication-done';

function hubpressPlugin(context) {
  context.on('application:stores', function (opts) {
    var _mutations, _actions;

    console.info('hubpressPlugin - application:stores');
    console.log('hubpressPlugin - application:stores', opts);

    var hubpress = {
      state: {
        post: {},
        posts: [],
        theme: {}
      },
      mutations: (_mutations = {}, _defineProperty(_mutations, APPLICATION_INITIALIZE_PLUGINS, function (state, nextRootState) {
        console.log('hubpress-' + APPLICATION_INITIALIZE_PLUGINS, nextRootState);
        _lodash2.default.merge(state, nextRootState.hubpress);
      }), _defineProperty(_mutations, HUBPRESS_INITIALIZE, function (state, nextState) {
        console.log('hubpress-' + HUBPRESS_INITIALIZE, nextState);
        _lodash2.default.merge(state, nextState);
      }), _defineProperty(_mutations, _constants.POSTS_GET, function (state, nextState) {
        console.log(_constants.POSTS_GET, nextState);
        state.posts = nextState.posts;
      }), _defineProperty(_mutations, _constants.POST_GET, function (state, nextState) {
        if (!nextState.post.content) {
          nextState.post.content = '// = Your Blog title\n// See https://hubpress.gitbooks.io/hubpress-knowledgebase/content/ for information about the parameters.\n// :hp-image: /covers/cover.png\n// :published_at: 2019-01-31\n// :hp-tags: HubPress, Blog, Open_Source,\n// :hp-alt-title: My English Title\n';
        }
        state.post = nextState.post;
      }), _defineProperty(_mutations, _constants.POST_REMOTE_SAVE, function (state, nextState) {
        console.log(_constants.POST_REMOTE_SAVE, nextState);
        _lodash2.default.merge(state, nextState);
      }), _defineProperty(_mutations, _constants.POST_PUBLISH, function (state, nextState) {
        console.log(_constants.POST_PUBLISH, nextState);
        _lodash2.default.merge(state, nextState);
      }), _defineProperty(_mutations, _constants.POST_UNPUBLISH, function (state, nextState) {
        console.log(_constants.POST_UNPUBLISH, nextState);
        _lodash2.default.merge(state, nextState);
      }), _defineProperty(_mutations, _constants.POSTS_SYNCHRONIZE, function (state, nextState) {
        console.log(_constants.POSTS_SYNCHRONIZE, nextState);
        _lodash2.default.merge(state, nextState);
      }), _defineProperty(_mutations, _constants.POST_CHANGE_CONTENT, function (state, nextState) {
        console.log('Content Changed', nextState);
        state.post = nextState.post;
      }), _defineProperty(_mutations, _constants.POST_DELETE, function (state, nextState) {
        console.log('Post deleted', nextState);
        _lodash2.default.merge(state, nextState);
      }), _mutations),
      actions: (_actions = {}, _defineProperty(_actions, AUTHORISATION_AUTHENTICATION_DONE, function (_ref) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit,
            rootState = _ref.rootState,
            state = _ref.state;

        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state)
        };
        return _logic2.default.initialize(opts).then(function (opts) {
          return commit(HUBPRESS_INITIALIZE, opts.nextState);
        }).then(function (_) {
          return console.info('HubPress initialized and synchronized');
        });
      }), _defineProperty(_actions, _constants.POSTS_SYNCHRONIZE, function (_ref2) {
        var dispatch = _ref2.dispatch,
            commit = _ref2.commit,
            rootState = _ref2.rootState,
            state = _ref2.state;

        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state)
        };
        return dispatch('application:loading').then(function (_) {
          return _logic2.default.synchronize(opts);
        }).then(function (updatedOpts) {
          return commit(_constants.POSTS_SYNCHRONIZE, updatedOpts.nextState);
        }).then(function (_) {
          return dispatch('application:loaded');
        }).then(function (_) {
          return dispatch('application:notify', {
            icon: 'refresh',
            header: 'Synchronization',
            message: 'Your content has been synchronized with success.',
            level: 'success'
          });
        });
      }), _defineProperty(_actions, _constants.POST_GET, function (_ref3, postId) {
        var dispatch = _ref3.dispatch,
            commit = _ref3.commit,
            rootState = _ref3.rootState,
            state = _ref3.state;

        console.log(_constants.POST_GET, postId);
        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state),
          nextState: _lodash2.default.cloneDeep(state)
        };
        opts.nextState.post._id = postId;

        return _logic2.default.getLocalPost(opts).then(function (opts) {
          return commit(_constants.POST_GET, opts.nextState);
        });
      }), _defineProperty(_actions, _constants.POST_DELETE, function (_ref4, postId) {
        var dispatch = _ref4.dispatch,
            commit = _ref4.commit,
            rootState = _ref4.rootState,
            state = _ref4.state;

        console.log(_constants.POST_DELETE, postId);
        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state),
          nextState: _lodash2.default.cloneDeep(state)
        };
        opts.nextState.post = {
          _id: postId
        };

        return dispatch('application:loading').then(function (_) {
          return _logic2.default.deletePost(opts);
        }).then(function (opts) {
          return commit(_constants.POST_DELETE, opts.nextState);
        }).then(function (_) {
          return dispatch('application:loaded');
        }).then(function (_) {
          return dispatch('application:notify', {
            icon: 'trash',
            header: 'Post deleted',
            message: 'Your post has been deleted with success.',
            level: 'success'
          });
        });
      }), _defineProperty(_actions, _constants.POST_REMOTE_SAVE, function (_ref5, postId) {
        var dispatch = _ref5.dispatch,
            commit = _ref5.commit,
            rootState = _ref5.rootState,
            state = _ref5.state;

        console.log(_constants.POST_REMOTE_SAVE, postId);
        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state)
        };

        return dispatch('application:loading').then(function (_) {
          return _logic2.default.remoteSavePost(opts);
        }).then(function (opts) {
          return commit(_constants.POST_REMOTE_SAVE, opts.nextState);
        }).then(function (_) {
          return dispatch('application:loaded');
        }).then(function (_) {
          return dispatch('application:notify', {
            icon: 'save',
            header: 'Post saved',
            message: 'Your post has been saved remotely with success.',
            level: 'success'
          });
        });
      }), _defineProperty(_actions, _constants.POST_PUBLISH, function (_ref6, postId) {
        var dispatch = _ref6.dispatch,
            commit = _ref6.commit,
            rootState = _ref6.rootState,
            state = _ref6.state;

        console.log(_constants.POST_PUBLISH, postId);
        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state)
        };

        return dispatch('application:loading').then(function (_) {
          return _logic2.default.publishPost(opts);
        }).then(function (updatedOpts) {
          return commit(_constants.POST_PUBLISH, updatedOpts.nextState);
        }).then(function (_) {
          return dispatch('application:loaded');
        }).then(function (_) {
          return dispatch('application:notify', {
            icon: 'rocket',
            header: 'Post published',
            message: 'Your post has been published with success.',
            level: 'success'
          });
        });
      }), _defineProperty(_actions, _constants.POST_UNPUBLISH, function (_ref7, postId) {
        var dispatch = _ref7.dispatch,
            commit = _ref7.commit,
            rootState = _ref7.rootState,
            state = _ref7.state;

        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state)
        };
        return dispatch('application:loading').then(function (_) {
          return _logic2.default.unpublishPost(opts);
        }).then(function (updatedOpts) {
          return commit(_constants.POST_UNPUBLISH, updatedOpts.nextState);
        }).then(function (_) {
          return dispatch('application:loaded');
        }).then(function (_) {
          return dispatch('application:notify', {
            icon: 'check circle',
            header: 'Post unpublished',
            message: 'Your post has been unpublished with success.',
            level: 'success'
          });
        });
      }), _defineProperty(_actions, _constants.POSTS_GET, function (_ref8) {
        var dispatch = _ref8.dispatch,
            commit = _ref8.commit,
            rootState = _ref8.rootState,
            state = _ref8.state;

        console.log(_constants.POSTS_GET);
        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state)
        };

        return dispatch('application:loading').then(function (_) {
          return _logic2.default.getLocalPosts(opts);
        }).then(function (opts) {
          return commit(_constants.POSTS_GET, opts.nextState);
        }).then(function (_) {
          return dispatch('application:loaded');
        });
      }), _defineProperty(_actions, _constants.POST_CHANGE_CONTENT, function (_ref9, postInfos) {
        var dispatch = _ref9.dispatch,
            commit = _ref9.commit,
            rootState = _ref9.rootState,
            state = _ref9.state;


        // postinfo = {
        //  _id,
        //  content
        //}
        var opts = {
          rootState: _lodash2.default.cloneDeep(rootState),
          currentState: _lodash2.default.cloneDeep(state),
          payload: { post: postInfos }
        };
        return _logic2.default.renderAndSavePost(opts).then(function (updatedOpts) {
          commit(_constants.POST_CHANGE_CONTENT, updatedOpts.nextState);
        });
      }), _actions),
      getters: {}
    };
    opts.nextState.stores.hubpress = hubpress;
    console.log('hubpressPlugin - application:stores - return', opts);
    return opts;
  });

  context.on('application:routes', function (opts) {
    console.info('hubpressPlugin - application:routes');
    console.log('hubpressPlugin - application:routes', opts);

    opts.nextState.routes.push({
      name: 'about',
      path: 'about',
      component: _About2.default
    }, {
      label: 'Posts',
      name: 'posts',
      path: 'posts',
      item: 'Content',
      component: _Posts2.default
    }, {
      name: 'post',
      path: 'posts/:id',
      component: _Post2.default
    });
    console.log('hubpressPlugin - application:routes - return', opts);
    return opts;
  });

  context.on('application:initialize-plugins', function (opts) {
    console.info('hubpressPlugin - application:initialize-plugins');
    console.log('hubpressPlugin - application:initialize-plugins', opts);
    // A tabs for settings
    opts.nextState.application.settingsTabs.push({
      id: 'hubpress',
      label: 'HubPress',
      component: _Settings2.default
    }, {
      id: 'hubpress-social',
      label: 'Social networks',
      component: _SettingsSocial2.default
    });

    if (!opts.rootState.authentication.isAuthenticated) return opts;
    // The event comes from application, so the nextState is a copy of the rootState,
    // To keep consistency, we create a localState in which the nextState is
    // the hubpress state

    var localOpts = Object.assign({}, opts, {
      nextState: opts.nextState.hubpress
    });
    return _logic2.default.initialize(localOpts).then(function (updatedOpts) {
      // Then we set our localOpts.nextState to the hubpress state
      opts.nextState.hubpress = updatedOpts.nextState;
      return opts;
    });
  });

  context.on('application:prepare-config', function (opts) {
    console.info('hubpressPlugin - application:prepare-config');
    console.log('hubpressPlugin - application:prepare-config', opts);

    // Config site

    opts.nextState.config.site = opts.nextState.config.site || {};
    opts.nextState.config.site.title = opts.payload.formData.get('hubpress-title');
    opts.nextState.config.site.description = opts.payload.formData.get('hubpress-description');
    opts.nextState.config.site.logo = opts.payload.formData.get('hubpress-logo');
    opts.nextState.config.site.cover = opts.payload.formData.get('hubpress-cover-image');
    opts.nextState.config.site.delay = opts.payload.formData.get('hubpress-render-delay');
    opts.nextState.config.site.postsPerPage = opts.payload.formData.get('hubpress-posts-per-page');
    opts.nextState.config.site.googleAnalytics = opts.payload.formData.get('hubpress-ga');
    opts.nextState.config.site.disqus = opts.payload.formData.get('hubpress-disqus');

    opts.nextState.config.theme = opts.nextState.config.theme || {};
    opts.nextState.config.theme.name = opts.payload.formData.get('hubpress-theme');

    // Config Social network
    opts.nextState.config.socialnetwork = opts.nextState.config.socialnetwork || {};
    opts.nextState.config.socialnetwork.email = opts.payload.formData.get('social-email');
    opts.nextState.config.socialnetwork.github = opts.payload.formData.get('social-github');
    opts.nextState.config.socialnetwork.twitter = opts.payload.formData.get('social-twitter');
    opts.nextState.config.socialnetwork.facebook = opts.payload.formData.get('social-facebook');
    opts.nextState.config.socialnetwork.googleplus = opts.payload.formData.get('social-googleplus');
    opts.nextState.config.socialnetwork.instagram = opts.payload.formData.get('social-instagram');
    opts.nextState.config.socialnetwork.pinterest = opts.payload.formData.get('social-pinterest');
    opts.nextState.config.socialnetwork.flickr = opts.payload.formData.get('social-flickr');
    opts.nextState.config.socialnetwork.linkedin = opts.payload.formData.get('social-linkedin');
    opts.nextState.config.socialnetwork.stackoverflow = opts.payload.formData.get('social-stackoverflow');

    console.log('hubpressPlugin - application:prepare-config - return', opts);
    return opts;
  });

  context.on('application:save-config-done', function (opts) {
    console.info('hubpressPlugin - application:save-config-done');
    console.log('hubpressPlugin - application:save-config-done', opts);

    var localOpts = Object.assign({}, opts, {
      nextState: opts.nextState.hubpress
    });
    return _logic2.default.refreshAfterSavedConfig(localOpts).then(function (updatedOpts) {
      // Then we set our localOpts.nextState to the hubpress state
      opts.nextState.hubpress = updatedOpts.nextState;
      return opts;
    });
    console.log('hubpressPlugin - application:save-config-done - return', opts);
    return opts;
  });
}