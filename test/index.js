var patternRename = require('../');
var should = require('should');
var gutil = require('gulp-util');
require('mocha');

describe('gulp-pattern-rename', function() {
  describe('gulp-pattern-rename()', function() {
    it('should rename file and folder with new value', function(done) {
      var stream = patternRename({
        props: {
          valueToReplace: 'newValue'
        }
      });
      var fakeFile = new gutil.File({
        path: '/home/__valueToReplace__/test/__valueToReplace__.js',
        base: '/home/__valueToReplace__/test/',
        cwd: '/home/__valueToReplace__/',
        contents: new Buffer('function test(){console.log("test");}')
      });

      stream.on('error', done);
      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/newValue/test/newValue.js');
        //newFile.relative.should.equal('../../newValue/test/newValue.js');
        done();
      });
      stream.write(fakeFile);
    });
  });
});
