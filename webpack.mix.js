const mix = require('laravel-mix');
const fs = require('fs');
const path = require('path');

const distFolderName = 'dist';
const distFileName = `${__dirname.split(path.sep).pop()}.js`;
const coreName = 'swiv-core';


mix.setPublicPath(distFolderName)
    .webpackConfig({
        resolve: {
            alias: {
                [coreName]: path.resolve(__dirname, '..', coreName),
            }
        }
    })
    .js('index.js', distFileName)
    .then(() => {
        const manifestPath = path.resolve(__dirname, distFolderName, 'mix-manifest.json');
        if (fs.existsSync(manifestPath)) {
            fs.unlink(manifestPath, () => {});
        }
    });
