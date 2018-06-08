const mix = require('laravel-mix');
const fs = require('fs');
const path = require('path');

const distFolderName = 'dist';
const distFileName = `${__dirname.split(path.sep).pop()}.js`;

mix.setPublicPath(distFolderName)
    .webpackConfig({
        resolve: {
            alias: {
                'google-enhanced-ecommerce-angularjs': path.resolve(__dirname, '..', 'google-enhanced-ecommerce-angularjs'),
                'google-enhanced-ecommerce-core': path.resolve(__dirname, '..', 'google-enhanced-ecommerce-core'),
            }
        }
    })
    .js('index.js', distFileName)
    .sourceMaps()
    .then(() => {
        const manifestPath = path.resolve(__dirname, distFolderName, 'mix-manifest.json');
        if (fs.existsSync(manifestPath)) {
            fs.unlink(manifestPath, () => {});
        }
    });
