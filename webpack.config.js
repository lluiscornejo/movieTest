const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Constant with our paths
const paths = {
    ROOT: path.resolve(__dirname),
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
};

// Environment
const developmentMode = process.env.NODE_ENV === 'development';

// HTML minify
const minify = developmentMode ? false : {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    removeComments: true,
    removeEmptyAttributes: true,
};

// Set plugins
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    hash: !developmentMode,
    minify,
});

const CssExtractWebpackPluginConfig = new ExtractTextPlugin('bundle.css', {allChunks: true});
const processEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SERVER: JSON.stringify(process.env.SERVER),
    },
});

module.exports = {
    entry: path.join(paths.SRC, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules/'),
                // exclude: /node_modules/,

                // Options to configure babel with
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                    plugins: [
                        'transform-decorators-legacy',
                        'babel-plugin-react-css-modules',
                        ['istanbul', {
                            exclude: [
                                'src/**/*.test.js',
                                'src/**/*.test.jsx',
                                'test',
                            ],
                        }],
                        ['module-resolver', {
                            root: ['./'],
                            alias: {
                                '@Common': './src/common',
                                '@Config': './src/application/config',
                            },
                        }],
                        [
                            'react-intl', {
                            messagesDir: './src/common/i18n/extracted-messages',
                        },
                        ],
                    ],
                },
            },
            {
                test: /\.(pcss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                sourceMap: developmentMode,
                                localIdentName: developmentMode
                                    ? '[name]__[local]___[hash:base64:5]'
                                    : '[hash:base64]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: developmentMode,
                                config: {
                                    path: path.join(paths.ROOT, 'postcss.config.js'),
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=./img/[name]-[hash].[ext]',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=./fonts/[name]-[hash].[ext]',
            },
        ],
    },
    devtool: developmentMode && '#inline-source-map',
    devServer: {
        noInfo: true,
        // HTML5 router
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
    },

    // Enable importing JS files without specifying their's extension
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        HtmlWebpackPluginConfig,
        CssExtractWebpackPluginConfig,
        processEnvPlugin,
    ],
};

if (!developmentMode) {
    module.exports.plugins.push(new UglifyJsPlugin({
        cache: true,
        uglifyOptions: {
            ecma: 8,
        },
    }));
}
