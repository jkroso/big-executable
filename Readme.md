
# big-executable

  inline a modules dependencies to reduce startup IO. Nodes `require` is blocking and can potentially do a _lot_ of IO to resolve modules. big-executable does all this work up front and throws the result into a single file so that when it comes time to run the code everything is there ready to go which should* result in faster startup times. It _could_ also make distributing your code easier in some cases since users won't need to use npm or anything other than node to run the code.

_\* From quick tests it doesn't seem to be that much faster_

## Installation

	$ npm install big-executable --save

then in your app:

```js
var big = require('big-executable')
```

## API

### big(file)

  create a version of `file` with its dependencies inlined. returns a promise for a string

```js
big(__dirname + '/index.js').read(console.log)
```

## CLI

  it also comes with an executable. To install that run:

```sh
$ npm install -g big-executable
```

  and with it the previous example would be:

```sh
$ big-executable index.js
```
