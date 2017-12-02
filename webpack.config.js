const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require(__dirname + '/package.json');
const sassLoaders = [
    'file-loader?name=../css/[name].css',
    'postcss-loader',
    'sass-loader?sourceMap'
];
const scriptsPath = path.resolve(__dirname, 'build');
const sitejs = ['./scripts/site.js'];
const sourceScripts = sitejs;
const IS_PRODUCTION = true; // = process.env.NODE_ENV === 'production';

const config = {
    devtool: IS_PRODUCTION ? false : 'source-map',
    entry: {
        'scripts/site-bundle': sourceScripts,
        'styles/custom': ['./sass/custom.scss']
    },
    output: {
        path: scriptsPath,
        filename: '[name].js'
    },
    module: {
        rules: [
            { // CSS
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css-loader?importLoaders=1'])
            },
            { // Sass
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            { // JavaScript
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: !IS_PRODUCTION,
        //     compress: IS_PRODUCTION ? {
        //         drop_console: true, // eslint-disable-line camelcase
        //         warnings: false
        //     } : false,
        //     mangle: IS_PRODUCTION ? {
        //         except: ['_'] // don't mangle lodash
        //     } : false,
        //     output: {
        //         comments: false
        //     }
        // }),

        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            proxy: 'localhost:9000',
            serveStatic: ['build/styles'],
            browser: (fs.existsSync('C:\\Program Files\\Firefox Developer Edition\\firefox.exe'))?
                'C:\\Program Files\\Firefox Developer Edition\\firefox.exe' :
                'firefox'
        }),

        new CopyWebpackPlugin([
            { from: 'sass', to: './sass' }
        ]),

        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].css',
            allChunks: true
        })
    ]
};

module.exports = config;
