const fs = require('fs');

module.exports = function (snowpackConfig, options) {
  const cdn = 'https://cdn.skypack.dev/';
  return {
    name: 'snowpack-plugin-skypack-replacer',
    async transform({fileExt, contents, isDev}) {
      if(isDev) return;
      const dependencies = options.dependencies || JSON.parse(fs.readFileSync('./package.json')).dependencies;
      const extensions = options.extensions || ['.js', '.jsx', '.ts', '.tsx'];
      if (!extensions.includes(fileExt) || !contents) return;

      const keys = Object.keys(dependencies);
      const values = Object.values(dependencies);
      keys.forEach((key, i) => {
        contents = contents.replace('from \''+key+'\'', 'from \'' + cdn + key + '@' + values[i]+'\'');
        contents = contents.replace('from\''+key+'\'', 'from\'' + cdn + key + '@' + values[i]+'\'');
        contents = contents.replace('from \"'+key+'\"', 'from \"' + cdn + key + '@' + values[i]+'\"');
        contents = contents.replace('from \"'+key+'\"', 'from\"' + cdn + key + '@' + values[i]+'\"');

        contents = contents.replace('import('+key+')', 'import(' + cdn + key + '@' + values[i]+')');
        contents = contents.replace('import ('+key+')', 'import (' + cdn + key + '@' + values[i]+')');
      });
      return contents;
    }
  };
};