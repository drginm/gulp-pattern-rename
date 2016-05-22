var _ = require('lodash');
var through = require('through2');
var sanitize = require("sanitize-filename");

module.exports = function(_opts) {
  var opts = {
    prefix: '__',
    suffix: '__',
    folderSeparator: '.'
  };

  _.extend(opts, _opts);

  function getValue(key, value) {
    var sanitizedValue;
    if(opts.meta && opts.meta[key] && opts.meta[key].createSubfolders) {
      var path = '';
      var subfolders = value.split(opts.meta[key].folderSeparator || opts.folderSeparator);

      _(subfolders).forEach(function(folder, index) {
        var sanitizedFolder = sanitize(folder).trim();

        if(sanitizedFolder && sanitizedFolder !== ''){
          path += sanitizedFolder;
          if(index < subfolders.length-1) {
            path += '/';
          }
        }
      });

      return path;
    }
    else {
      sanitizedValue = sanitize(value.toString());
    }
    return sanitizedValue;
  }

  function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  function raplaceName(filePath, pattern, value) {
    var sanitizedValue = getValue(pattern, value);
    return replaceAll(filePath, sanitize(opts.prefix + pattern + opts.suffix), sanitizedValue);
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
