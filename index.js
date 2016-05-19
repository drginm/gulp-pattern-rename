var _ = require('lodash');
var through = require('through2');
var sanitize = require("sanitize-filename");

module.exports = function(_opts) {
  var opts = {
    prefix: '__',
    suffix: '__'
  };

  _.extend(opts, _opts);

  function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  function raplaceName(filePath, pattern, value) {
    return replaceAll(filePath, sanitize(opts.prefix + pattern + opts.suffix), sanitize(value));
  }

  function modifyFile(file, enc, cb) {
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error('gulp-pattern-rename: Streaming not supported'));

    _.forOwn(opts.props, function(value, key) {
      file.path = raplaceName(file.path, key, value);
    });

    cb(null, file);
  }

  return through.obj(modifyFile);
};
