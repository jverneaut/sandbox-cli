const path = require('path');
const glob = require('glob');

const baseDirectory = process.cwd();
const pagesDirectory = path.join(baseDirectory, 'pages');

const pages = glob.sync(`${pagesDirectory}/**/index.twig`).map((pagePath) => {
  const location = pagePath.split(pagesDirectory)[1].replace('index.twig', '');

  const assetsExtensions = ['scss', 'md', 'js'];
  const assets = assetsExtensions
    .map((assetExtension) =>
      glob.sync(pagePath.replace('twig', assetExtension))
    )
    .filter((asset) => asset.length === 1)
    .map((asset) => asset[0]);

  return {
    path: pagePath,
    slug: location.slice(1, -1),
    filename: location.slice(1) + 'index.html',
    assets: assets.reduce((acc, curr) => {
      const extension = curr.split('.')[1];

      return {
        ...acc,
        [extension]: curr,
      };
    }, {}),
  };
});

module.exports = pages;
