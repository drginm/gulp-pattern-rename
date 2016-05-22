# gulp-pattern-rename

[![NPM](https://nodei.co/npm/gulp-pattern-rename.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-pattern-rename/)
[![status](https://secure.travis-ci.org/drginm/gulp-pattern-rename.png?branch=master)](https://travis-ci.org/drginm/gulp-pattern-rename)

Pattern based rename

# Usage
This is a gulp plugin for renaming files using properties.

```javascript
var patternRename = require('gulp-pattern-rename');

patternRename({
  prefix: '__',//optional
  suffix: '__',//optional
  props: {
    valueToReplace: 'newValue',
    anotherValue: 'anotherNewValue',
    package: 'one.two.three'
  }
  meta: {
    package: {
      createSubfolders: true,
      //folderSeparator is optional, use only when the separator is different from the one provided here
      //for example if you have a value like 'one/two/three' for the 'package' property, then you should use '/' for the folderSeparator
      folderSeparator: '.'
    }
  }
})

This will replace a file name in the following way:

original
__valueToReplace__SomethingElse/__package__/__valueToReplace__-__anotherValue__.js

into
newValueSomethingElse/one/two/three/newValue-anotherNewValue.js
