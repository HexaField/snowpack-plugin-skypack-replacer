# Snowpack Plugin - Skypack Replacer

Replaces your imports with skypack CDN

## WARNING! USE AT OWN RISK

This package has not been tested extensively. Do not expect it to work for every situation. Feel free to create an issue or PR in the case you have problems, solutions, ideas or feature requests. Happy caching!

Second disclaimer: [this seems like it will soon be an internal feature to skypack](https://docs.skypack.dev/plugins)

## Example

```
"plugins": [
  [
    "snowpack-plugin-skypack-replacer", {
      "modules": {
        "react-dom": "^16.13.1",
        "react": "^16.13.1"
      },
      "extensions": [".js", ".jsx"]
    }
  ]
]
```
will result in the following in only files with '.js' and '.jsx' extensions.

```
import React from 'react';
import ReactDOM from 'react-dom';
```
be converted to

```
import React from 'https://cdn.skypack.dev/react@^16.13.1';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@^16.13.1';
```

in production builds but not development.