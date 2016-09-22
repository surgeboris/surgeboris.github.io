const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');


const PLUGIN_NAME = 'gulp-compile-pages';
const EXT_REGEX = /\.html\.js$/;

function emitError(obj, cb, msg) {
  const err = new gutil.PluginError(PLUGIN_NAME, msg);
  obj.emit('error', err);
  cb(err);
  return err;
}

function gulpCompileSiteTransform(file, encoding, callback) {
  const emitPluginError = emitError.bind(this, this, callback);

  if (file.isDirectory()) {
    this.push(file);
    return callback();
  }

  if (file.isStream()) return emitPluginError('Streaming not supported');
  if (!file.path) return emitPluginError('Cannot read path');
  const hasWrongExtension = EXT_REGEX.test(file.basename);
  if (hasWrongExtension) return emitPluginError("Expected '*.html.js' file");

  delete require.cache[path.resolve(file.path)];
  const htmlPromise = require(file.path);
  if (typeof(htmlPromise.then) !== 'function') {
    return emitPluginError(
      `Promise expected to be returned from template file ${file.path}`
   );
  }

  htmlPromise.then(html => {
    file.path = file.path.replace(EXT_REGEX, '.html');
    file.contents = new Buffer(html);
    this.push(file);
    callback();
  }).catch(error => setImmediate(() => emitPluginError(error.toString())));
}

module.exports = function gulpCompileSitePlugin() {
  return through.obj(gulpCompileSiteTransform);
};
