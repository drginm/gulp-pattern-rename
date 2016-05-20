var patternRename = require('../');
var should = require('should');
var gutil = require('gulp-util');
require('mocha');

describe('gulp-pattern-rename', function() {
  describe('gulp-pattern-rename()', function() {
    it('should rename file and folder with new value', function(done) {
      var stream = patternRename({
        props: {
          valueToReplace: 'newValue',
          anotherValue: 'anotherNewValue'
        }
      });
      var fakeFile = new gutil.File({
        path: '/home/__valueToReplace__/test/__valueToReplace__-__anotherValue__.js',
        base: '/home/__valueToReplace__/test/',
        cwd: '/home/__valueToReplace__/',
        contents: new Buffer('test content')
      });

      testStream(stream, fakeFile, '/home/newValue/test/newValue-anotherNewValue.js', done);
    });
    it('should rename file and folder with new boolean value', function(done) {
      var stream = patternRename({
        props: {
          valueToReplace: true
        }
      });
      var fakeFile = new gutil.File({
        path: '/home/__valueToReplace__/test/__valueToReplace__.js',
        base: '/home/__valueToReplace__/test/',
        cwd: '/home/__valueToReplace__/',
        contents: new Buffer('test content')
      });

      testStream(stream, fakeFile, '/home/true/test/true.js', done);
    });
    it('should use a custom suffix and prefix when renaming a folder or file', function(done) {
      var stream = patternRename({
        prefix: '11',
        suffix: '22',
        props: {
          valueToReplace: true
        }
      });
      var fakeFile = new gutil.File({
        path: '/home/11valueToReplace22/test/11valueToReplace22.js',
        base: '/home/11valueToReplace22/test/',
        cwd: '/home/11valueToReplace22/',
        contents: new Buffer('test content')
      });

      testStream(stream, fakeFile, '/home/true/test/true.js', done);
    });

    function testStream(stream, fakeFile, expectedString, done) {

      stream.on('error', done);
      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal(expectedString);
        //newFile.relative.should.equal('../../true/test/true.js');
        done();
      });
      stream.write(fakeFile);
    }
  });
});
