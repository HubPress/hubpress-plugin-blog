<template>
<div class="post-container">
  <div class="ui fixed inverted menu">
    <div class="right menu">
      <a href="#" class="item" v-on:click.stop.prevent="showAsciidocHelp()">
        <div class="ui icon" data-tooltip="Need some help?" data-position="bottom right">
          <i class="help large icon"></i>
        </div>
      </a>
      <a href="#" class="item" v-on:click.stop.prevent="switchLight()">
        <div class="ui icon" v-bind:data-tooltip="lightLabel" data-position="bottom right">
          <i class="large icon" v-bind:class="{ 'sun': isDark, 'moon': !isDark }"></i>
        </div>
      </a>
      <a href="#" class="item" v-on:click.stop.prevent="switchPreview()">
        <div class="ui icon" v-bind:data-tooltip="previewLabel" data-position="bottom right">
          <i class="large icon" v-bind:class="{'unhide':!isPreviewVisible, 'hide':isPreviewVisible}"></i>
        </div>
      </a>
      <a href="#" class="item" v-if="isRemoteActionVisible" v-on:click.stop.prevent="remoteSave()">
        <div class="ui icon" data-tooltip="Save your post remotely" data-position="bottom right">
          <i class="save large icon"></i>
        </div>
      </a>
      <a href="#" class="item" v-if="isRemoteActionVisible" v-on:click.stop.prevent="publish()">
        <div class="ui icon" v-bind:data-tooltip="publishLabel" data-position="bottom right">
          <i class="icons">
            <i class="cloud large icon" v-bind:class="{'download': post.published, 'upload': !post.published}"></i>
          </i>
        </div>
      </a>
    </div>
  </div>

  <div id="asciidoc-help" class="ui modal">
    <i class="close icon"></i>
    <div class="header">
      Asciidoc syntax help
    </div>
    <div class="content">
      <table class="ui table">
        <thead>
          <tr>
            <th class="heigth wide">Result</th>
            <th class="heigth wide">Asciidoc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>H1</td>
            <td>= Title</td>
          </tr>
          <tr>
            <td>H2</td>
            <td>== Title</td>
          </tr>
          <tr>
            <td>H3</td>
            <td>=== Title</td>
          </tr>
          <tr>
            <td><strong>Bold</strong></td>
            <td>*content*</td>
          </tr>
          <tr>
            <td><i>Emphasize</i></td>
            <td>_content_</td>
          </tr>
          <tr>
            <td><a href="#">Link</a></td>
            <td>http://asciidoctor.org[Asciidoctor]</td>
          </tr>
          <tr>
            <td>Image Block</td>
            <td>image::sunset.jpg[]</td>
          </tr>
          <tr>
            <td>Image Inline</td>
            <td>Click image:icons/pause.png[title="Pause"] when you need a break.</td>
          </tr>
          <tr>
            <td>Video</td>
            <td>video::video_file.mp4[]</td>
          </tr>
          <tr>
            <td>Unordered list</td>
            <td>* item</td>
          </tr>
          <tr>
            <td>Ordered list</td>
            <td>. item</td>
          </tr>
          <tr>
            <td><code>Inline code</code></td>
            <td>`code`</td>
          </tr>
        </tbody>
      </table>
      <p>
        More informations about the Asciidoc syntax here: <a href="http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/" target="_blank">AsciiDoc Syntax Quick Reference</a>
      </p>
    </div>
  </div>

  <div class="post-editor">
    <div class="ui grid" v-bind:class="{ 'dark': isDark, 'light': !isDark }">
      <div class="row">

      <div id="asciidoc-content" class="column" v-bind:class="{'sixteen wide mobile height wide computer is-preview-visible': isPreviewVisible, 'sixteen wide': !isPreviewVisible}">
        <codemirror ref="codeEditor" class="container" :code="content" :options="editorOption" @changed="contentChange"></codemirror>

      </div>
      <div id="asciidoc-preview" class="column" v-bind:class="{'sixteen wide mobile height wide computer is-preview-visible': isPreviewVisible}" v-if="isPreviewVisible">
        <preview :post="post"></preview>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import asciidocMode from './codemirror/mode/asciidoc'
import overlay from './codemirror/mode/overlay'
import Preview from './Preview'

//
// const themes = [
//   // 'zenburn',
//   'base16-light'
//   // '3024-day',
//   // 'duotone-dark',
//   // 'mdn-like',
//   // 'seti',
//   // '3024-night',
//   // 'duotone-light',
//   // 'midnight',
//   // 'solarized',
//   // 'abcdef',
//   // 'eclipse',
//   // 'monokai',
//   // 'the-matrix',
//   // 'ambiance-mobile',
//   // 'elegant',
//   // 'neat',
//   // 'tomorrow-night-bright',
//   // 'ambiance',
//   // 'erlang-dark',
//   // 'neo',
//   // 'tomorrow-night-eighties',
//   // 'base16-dark',
//   // 'hopscotch',
//   // 'night',
//   // 'ttcn',
//   // 'icecoder',
//   // 'panda-syntax',
//   // 'twilight',
//   // 'bespin',
//   // 'isotope',
//   // 'paraiso-dark',
//   // 'vibrant-ink',
//   // 'blackboard',
//   // 'lesser-dark',
//   // 'paraiso-light',
//   // 'xq-dark',
//   // 'cobalt',
//   // 'liquibyte',
//   // 'pastel-on-dark',
//   // 'xq-light',
//   // 'colorforth',
//   // 'material',
//   // 'railscasts',
//   // 'yeti',
//   // 'dracula',
//   // 'mbo',
//   // 'rubyblue'
// ]
//
// themes.forEach(theme => {
//   require(`codemirror/theme/${theme}.css`)
// })

import {
  POST_GET,
  POST_CHANGE_CONTENT,
  POST_REMOTE_SAVE,
  POST_PUBLISH,
  POST_UNPUBLISH
} from '../constants'

export default {
  name: 'posts',
  data() {
    return {
      content: undefined,
      timeout: undefined,
      isDark: true,
      isPreviewVisible: false,
      editorOption: {
        // 下面所有配置同Codemirror配置，均为可选
        tabSize: 4,
        mode: 'asciidoc',
        theme: 'zenburn',
        lineNumbers: false,
        line: true,
        lineWrapping: true,
        fixedGutter: true,
        // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
        keyMap: "sublime",
        // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
        extraKeys: {
          "Ctrl": "autocomplete"
        },
        // 代码折叠
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers"],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        highlightSelectionMatches: {
          showToken: /\w/,
          annotateScrollbar: true
        },
        // more codemirror config...
        // 如果有hint方面的配置，也应该出现在这里
      }
    }
  },
  methods: {
    contentChange: function(updatedContent) {
      if (this.post.content === updatedContent)
        return

      const delay = this.$store.state.application.config.meta.delay ? this.$store.state.application.config.meta.delay : 200

      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }

      this.timeout = window.setTimeout(() => {
        this.$store.dispatch(POST_CHANGE_CONTENT, {
          _id: this.post._id,
          content: updatedContent
        })
      }, delay ? delay : 200);
    },
    showAsciidocHelp: function() {
      $('#asciidoc-help')
        .modal('show');
    },
    switchLight: function() {
      this.isDark = !this.isDark
      this.$refs.codeEditor.editor.setOption('theme', this.isDark ? 'zenburn':'base16-light')
    },
    switchPreview: function() {
      this.isPreviewVisible = !this.isPreviewVisible
    },
    remoteSave: function() {
      if (this.post.published) {
        this.$store.dispatch(POST_PUBLISH, this.post._id)
      } else {
        this.$store.dispatch(POST_REMOTE_SAVE, this.post._id)
      }
    },
    publish: function() {
      if (this.post.published) {
        this.$store.dispatch(POST_UNPUBLISH, this.post._id)
      } else {
        this.$store.dispatch(POST_PUBLISH, this.post._id)
      }
    },
    unpublish: function() {
      this.$store.dispatch(POST_UNPUBLISH, this.post._id)
    }
  },
  beforeMount: function() {
    this.$store.dispatch(POST_GET, this.$route.params.id)
  },
  mounted: function() {
    $('.ui.dropdown.item.themes')
      .dropdown()

    $('#asciidoc-help')
      .modal({
        closable: true
      })
  },
  beforeUpdate: function() {
    if (!this.content) {
      this.content = this.post.content
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id
    },
    post: function() {
      return this.$store.state.hubpress.post
    },
    previewLabel: function() {
      return this.isPreviewVisible? 'Hide preview' : 'Show preview'
    },
    lightLabel: function() {
      return this.isDark ? 'Light mode' : 'Dark mode'
    },
    publishLabel: function() {
      return this.$store.state.hubpress.post.published ? 'Unpublish post' : 'Publish post'
    },
    isRemoteActionVisible: function() {
      return !!this.$store.state.hubpress.post.title
    }
  },
  beforeCreate: () => {},
  created: function() {},
  components: {
    Preview
  }
}
</script>

<style>
/*.CodeMirror-scroll {padding: 30px 100px 30px 100px; box-sizing: border-box;}*/

.CodeMirror-sizer {
  padding-top: 2em;
  font-size: 1.14285714rem;
  max-width: 750px !important;
  line-height: 1.5;
  display: block;
}

@media only screen and (max-width: 767px) {
  .CodeMirror-sizer {
    width: auto !important;
    margin-left: 1em !important;
    margin-right: 1em !important;
  }
}

@media only screen and (min-width: 768px) {
  .CodeMirror-sizer {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

.CodeMirror-gutter-wrapper {
  display: none !important;
}

.cm-header {
  font-size: 1.8em;
  font-weight: bold;
}

.cm-header-2 {
  font-size: 1.6em;
  font-weight: bold;
}

.cm-header-3 {
  font-size: 1.45em;
  font-weight: bold;
}

.cm-header-4 {
  font-size: 1.3em;
  font-weight: bold;
}

.cm-header-5 {
  font-size: 1.15em;
  font-weight: bold;
}

.cm-header-6 {
  font-size: 1.05em;
  font-weight: bold;
}

.post-editor {
  padding-top: 47px;
}

.post-editor,
.post-editor .ui.grid,
.post-editor .ui.grid .column,
.CodeMirror,
.post-container {
  height: 100%;
  min-height: 100%;
}

.post-editor .ui.grid > .row {
  padding-top: 0;
  padding-bottom: 0;
}
.post-editor .ui.grid.light > .row {
  background-color: #f5f5f5;
  color: #202020;
}
.post-editor .ui.grid.light > .row .ui.header {
  color: #202020;
}
.post-editor .ui.grid.light > .row a {
  color: #aa759f;
}
.post-editor .ui.grid.dark > .row, .post-editor .ui.grid.dark > .row .ui.header {
  background-color: #3f3f3f;
  color: #dcdccc;
}
.post-editor .ui.grid.dark > .row .ui.header {
  color: #dcdccc;
}
.post-editor .ui.grid.dark > .row a {
  color: #dcdcaa;
}

.post-editor .ui.grid {
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}

.post-editor .ui.grid .column {
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}

#asciidoc-content,
#asciidoc-preview {
  height: calc(100vh - 47px);
  min-height: calc(100vh - 47px);
}

#asciidoc-preview {
  overflow-y: auto;
  padding-top: 2em;
  font-size: 1.2em;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  word-wrap: break-word;
}

#asciidoc-preview > div {
  max-width: 750px !important;
  margin: auto auto;
}

#asciidoc-preview > div .ui.header {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}

#asciidoc-preview .content pre {
  background-color: #dcdccc;
  color: #2e2e2e;
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
}

#asciidoc-preview .paragraph {
  padding: 0.75em 0;
}

#asciidoc-preview img {
  width: 100%;
  max-width: 100%;
}

@media screen and (max-width: 992px) {
  #asciidoc-content {
    display:block;
  }
  #asciidoc-content.is-preview-visible {
    display:none;
  }
  #asciidoc-preview {
    display:none;
  }
  #asciidoc-preview.is-preview-visible {
    display:block;
  }
}

.item .ui.icon .rocket.unpublish {
  transform: rotate(90deg);
}

/**
 * "
 *  Using Zenburn color palette from the Emacs Zenburn Theme
 *  https://github.com/bbatsov/zenburn-emacs/blob/master/zenburn-theme.el
 *
 *  Also using parts of https://github.com/xavi/coderay-lighttable-theme
 * "
 * From: https://github.com/wisenomad/zenburn-lighttable-theme/blob/master/zenburn.css
 */

.cm-s-zenburn.CodeMirror .CodeMirror-gutters { background: #3f3f3f !important; }
.cm-s-zenburn.CodeMirror .CodeMirror-foldgutter-open, .CodeMirror-foldgutter-folded { color: #999; }
.cm-s-zenburn.CodeMirror .CodeMirror-cursor { border-left: 1px solid white; }
.cm-s-zenburn.CodeMirror { background-color: #3f3f3f; color: #dcdccc; }
.cm-s-zenburn.CodeMirror span.cm-builtin { color: #dcdccc; font-weight: bold; }
.cm-s-zenburn.CodeMirror span.cm-comment { color: #7f9f7f; }
.cm-s-zenburn.CodeMirror span.cm-keyword { color: #f0dfaf; font-weight: bold; }
.cm-s-zenburn.CodeMirror span.cm-atom { color: #bfebbf; }
.cm-s-zenburn.CodeMirror span.cm-def { color: #dcdccc; }
.cm-s-zenburn.CodeMirror span.cm-variable { color: #dfaf8f; }
.cm-s-zenburn.CodeMirror span.cm-variable-2 { color: #dcdccc; }
.cm-s-zenburn.CodeMirror span.cm-string { color: #cc9393; }
.cm-s-zenburn.CodeMirror span.cm-string-2 { color: #cc9393; }
.cm-s-zenburn.CodeMirror span.cm-number { color: #dcdccc; }
.cm-s-zenburn.CodeMirror span.cm-tag { color: #93e0e3; }
.cm-s-zenburn.CodeMirror span.cm-property { color: #dfaf8f; }
.cm-s-zenburn.CodeMirror span.cm-attribute { color: #dfaf8f; }
.cm-s-zenburn.CodeMirror span.cm-qualifier { color: #7cb8bb; }
.cm-s-zenburn.CodeMirror span.cm-meta { color: #f0dfaf; }
.cm-s-zenburn.CodeMirror span.cm-header { color: #f0efd0; }
.cm-s-zenburn.CodeMirror span.cm-operator { color: #f0efd0; }
.cm-s-zenburn.CodeMirror span.CodeMirror-matchingbracket { box-sizing: border-box; background: transparent; border-bottom: 1px solid; }
.cm-s-zenburn.CodeMirror span.CodeMirror-nonmatchingbracket { border-bottom: 1px solid; background: none; }
.cm-s-zenburn.CodeMirror .CodeMirror-activeline { background: #000000; }
.cm-s-zenburn.CodeMirror .CodeMirror-activeline-background { background: #000000; }
.cm-s-zenburn.CodeMirror div.CodeMirror-selected { background: #545454; }
.cm-s-zenburn.CodeMirror .CodeMirror-focused div.CodeMirror-selected { background: #4f4f4f; }

/*

    Name:       Base16 Default Light
    Author:     Chris Kempson (http://chriskempson.com)

    CodeMirror template by Jan T. Sott (https://github.com/idleberg/base16-codemirror)
    Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)

*/

.cm-s-base16-light.CodeMirror { background: #f5f5f5; color: #202020; }
.cm-s-base16-light.CodeMirror div.CodeMirror-selected { background: #e0e0e0; }
.cm-s-base16-light.CodeMirror .CodeMirror-line::selection, .cm-s-base16-light.CodeMirror .CodeMirror-line > span::selection, .cm-s-base16-light.CodeMirror .CodeMirror-line > span > span::selection { background: #e0e0e0; }
.cm-s-base16-light.CodeMirror .CodeMirror-line::-moz-selection, .cm-s-base16-light.CodeMirror .CodeMirror-line > span::-moz-selection, .cm-s-base16-light.CodeMirror .CodeMirror-line > span > span::-moz-selection { background: #e0e0e0; }
.cm-s-base16-light.CodeMirror .CodeMirror-gutters { background: #f5f5f5; border-right: 0px; }
.cm-s-base16-light.CodeMirror .CodeMirror-guttermarker { color: #ac4142; }
.cm-s-base16-light.CodeMirror .CodeMirror-guttermarker-subtle { color: #b0b0b0; }
.cm-s-base16-light.CodeMirror .CodeMirror-linenumber { color: #b0b0b0; }
.cm-s-base16-light.CodeMirror .CodeMirror-cursor { border-left: 1px solid #505050; }

.cm-s-base16-light.CodeMirror span.cm-comment { color: #8f5536; }
.cm-s-base16-light.CodeMirror span.cm-atom { color: #aa759f; }
.cm-s-base16-light.CodeMirror span.cm-number { color: #aa759f; }

.cm-s-base16-light.CodeMirror span.cm-property, .cm-s-base16-light.CodeMirror span.cm-attribute { color: #90a959; }
.cm-s-base16-light.CodeMirror span.cm-keyword { color: #ac4142; }
.cm-s-base16-light.CodeMirror span.cm-string { color: #f4bf75; }

.cm-s-base16-light.CodeMirror span.cm-variable { color: #90a959; }
.cm-s-base16-light.CodeMirror span.cm-variable-2 { color: #6a9fb5; }
.cm-s-base16-light.CodeMirror span.cm-def { color: #d28445; }
.cm-s-base16-light.CodeMirror span.cm-bracket { color: #202020; }
.cm-s-base16-light.CodeMirror span.cm-tag { color: #ac4142; }
.cm-s-base16-light.CodeMirror span.cm-link { color: #aa759f; }
.cm-s-base16-light.CodeMirror span.cm-error { background: #ac4142; color: #505050; }

.cm-s-base16-light.CodeMirror .CodeMirror-activeline-background { background: #DDDCDC; }
.cm-s-base16-light.CodeMirror .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }


</style>
