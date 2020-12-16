const { transform } = require('.')(null, {
  dependencies: {
    "react-dom": "^17.0.1",
    "react": "^17.0.1",
  }
});

const contents = `import React from 'react';`;
const expectedContents = `import React from 'https://cdn.skypack.dev/react@^17.0.1';`

it('replaces import with skypack', async () => {
  let t = await transform({
    fileExt: '.js',
    contents,
  });
  return expect(t).toBe(expectedContents);
})
