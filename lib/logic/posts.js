'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fires = require('./fires');

var _fires2 = _interopRequireDefault(_fires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLocalPost(opts) {
  console.log('getLocalPost', opts);

  return _fires2.default.fireRequestLocalPost(opts).then(function (opts) {
    return _fires2.default.fireReceiveLocalPost(opts);
  });
}

function getLocalPosts(opts) {
  return _fires2.default.fireRequestLocalPosts(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPosts(updatedOpts);
  });
}

function renderAndSavePost(opts) {
  return _fires2.default.fireRequestLocalPost(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    updatedOpts.nextState.post.content = updatedOpts.payload.post.content;
    return updatedOpts;
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestRenderingPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveRenderingPost(updatedOpts);
  }).then(function (updatedOpts) {
    if (updatedOpts.nextState.post && updatedOpts.nextState.post.title) {
      return _fires2.default.fireRequestSaveLocalPost(updatedOpts).then(function (updatedOpts) {
        return _fires2.default.fireReceiveSaveLocalPost(updatedOpts);
      });
    }

    return updatedOpts;
  });
}

function remoteSavePost(opts) {
  return _fires2.default.fireRequestLocalPost(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveRemotePost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveRemotePost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveLocalPost(updatedOpts);
  });
}

function publishPost(opts) {
  return _fires2.default.fireRequestLocalPost(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    // Save the tags before the original is erase after remote save
    var oTags = updatedOpts.nextState.post.original && updatedOpts.nextState.post.original.tags || [];
    updatedOpts.nextState.tags = _.union(updatedOpts.nextState.post.tags, oTags);
    return updatedOpts;
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveRemotePost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveRemotePost(updatedOpts);
  })
  // Maybe we should make something fireRequestMarkAsPublished
  .then(function (updatedOpts) {
    updatedOpts.nextState.post.original.author = updatedOpts.nextState.post.original.author || updatedOpts.nextState.post.author;
    updatedOpts.nextState.post.published = 1;
    return updatedOpts;
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveLocalPost(updatedOpts);
  })
  // Get publishedPosts to rebuild all content
  .then(function (updatedOpts) {
    return _fires2.default.fireRequestLocalPublishedPosts(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPublishedPosts(updatedOpts);
  })
  // Generate Index / Post / Tags
  .then(function (updatedOpts) {
    return _fires2.default.fireRequestGenerateIndex(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGenerateIndex(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestGeneratePost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGeneratePost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestGenerateTags(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGenerateTags(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestGenerateAuthors(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGenerateAuthors(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveRemotePublishedElements(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveRemotePublishedElements(updatedOpts);
  });
}

function unpublishPost(opts) {
  return _fires2.default.fireRequestLocalPost(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    // Save the tags before the original is erase after remote save
    var oTags = updatedOpts.nextState.post.original && updatedOpts.nextState.post.original.tags || [];
    updatedOpts.nextState.tags = oTags;
    return updatedOpts;
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestDeleteRemotePublishedPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveDeleteRemotePublishedPost(updatedOpts);
  })
  // Maybe we should make something fireRequestMarkAsPublished
  .then(function (updatedOpts) {
    updatedOpts.nextState.post.published = 0;
    return updatedOpts;
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveLocalPost(updatedOpts);
  })
  // Get publishedPosts to rebuild all content
  .then(function (updatedOpts) {
    return _fires2.default.fireRequestLocalPublishedPosts(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPublishedPosts(updatedOpts);
  })
  // Generate Index / Tags
  .then(function (updatedOpts) {
    return _fires2.default.fireRequestGenerateIndex(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGenerateIndex(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestGenerateTags(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGenerateTags(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestGenerateAuthors(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveGenerateAuthors(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireRequestSaveRemotePublishedElements(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveSaveRemotePublishedElements(updatedOpts);
  });
}

function deletePost(opts) {
  return _fires2.default.fireRequestLocalPost(opts).then(function (updatedOpts) {
    return _fires2.default.fireReceiveLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    // Save the tags before the original is erase after remote save
    var oTags = updatedOpts.nextState.post.original && updatedOpts.nextState.post.original.tags || [];
    updatedOpts.nextState.tags = oTags;
    return updatedOpts;
  }).then(function (updatedOpts) {
    if (updatedOpts.nextState.post.original) {
      return _fires2.default.fireRequestDeleteRemotePost(updatedOpts).then(function (updatedOpts) {
        return _fires2.default.fireReceiveDeleteRemotePost(updatedOpts);
      });
    } else {
      return updatedOpts;
    }
  })
  // Delete from local
  .then(function (updatedOpts) {
    return _fires2.default.fireRequestDeleteLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    return _fires2.default.fireReceiveDeleteLocalPost(updatedOpts);
  }).then(function (updatedOpts) {
    if (!updatedOpts.nextState.post.published) {
      return updatedOpts;
    } else {
      return _fires2.default.fireRequestDeleteRemotePublishedPost(updatedOpts).then(function (updatedOpts) {
        return _fires2.default.fireReceiveDeleteRemotePublishedPost(updatedOpts);
      })
      // Get publishedPosts to rebuild all content
      .then(function (updatedOpts) {
        return _fires2.default.fireRequestLocalPublishedPosts(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireReceiveLocalPublishedPosts(updatedOpts);
      })
      // Generate Index / Tags
      .then(function (updatedOpts) {
        return _fires2.default.fireRequestGenerateIndex(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireReceiveGenerateIndex(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireRequestGenerateTags(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireReceiveGenerateTags(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireRequestGenerateAuthors(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireReceiveGenerateAuthors(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireRequestSaveRemotePublishedElements(updatedOpts);
      }).then(function (updatedOpts) {
        return _fires2.default.fireReceiveSaveRemotePublishedElements(updatedOpts);
      });
    }
  }).then(getLocalPosts);
}

exports.default = {
  deletePost: deletePost,
  getLocalPost: getLocalPost,
  getLocalPosts: getLocalPosts,
  remoteSavePost: remoteSavePost,
  renderAndSavePost: renderAndSavePost,
  publishPost: publishPost,
  unpublishPost: unpublishPost
};