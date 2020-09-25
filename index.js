module.exports = function (snowpackConfig, pluginOptions) {

  const cdn = 'https://cdn.skypack.dev/';
  
  return {
    name: 'snowpack-plugin-skypack-replacer',
    async transform({fileExt, contents, isDev}) { 
      
      if(isDev) return;
      const { extensions, modules } = pluginOptions;
      if (!extensions.includes(fileExt) || !contents) return;

      const keys = Object.keys(modules);
      const values = Object.values(modules);
      
      // console.log(contents.split('\n').filter((line) => line.includes('import')));
      keys.forEach((key, i) => {
        contents = contents.replace('from \''+key+'\'', 'from \'' + cdn + key + '@' + values[i]+'\'');
        contents = contents.replace('from\''+key+'\'', 'from\'' + cdn + key + '@' + values[i]+'\'');
        contents = contents.replace('from \"'+key+'\"', 'from \"' + cdn + key + '@' + values[i]+'\"');
        contents = contents.replace('from \"'+key+'\"', 'from\"' + cdn + key + '@' + values[i]+'\"');

        contents = contents.replace('import('+key+')', 'import(' + cdn + key + '@' + values[i]+')');
        contents = contents.replace('import ('+key+')', 'import (' + cdn + key + '@' + values[i]+')');
      });
      // console.log(contents.split('\n').filter((line) => line.includes('import')));

      return contents;
    }
  };
};