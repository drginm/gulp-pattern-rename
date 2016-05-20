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
    anotherValue: 'anotherNewValue'
  }
})

This will replace a file name in the following way:

original
__valueToReplace__SomethingElse/__valueToReplace__-__anotherValue__.js

into
newValueSomethingElse/newValue-anotherNewValue.js
