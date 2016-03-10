var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProduction = process.env.NODE_ENV === 'production';

var entrys = {
    main: './src/app.js'
};

var output = isProduction ? { path: __dirname + '/dist', filename: '[name].js', publicPath: "." } : { path: __dirname, filename: './dist/[name].js' };

var modules = {
    loaders: [
        { test: /\.vue$/, loader: 'vue' },
        { test: /\.css$/, loader: isProduction ? ExtractTextPlugin.extract("style", "css") : "style!css" },
        { test: /\.js$/, loader: 'jsx-loader?harmony' },
        { test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/, loader: isProduction ? 'url-loader?limit=1000&name=/img/[hash].[ext]' : 'url-loader?limit=29812' },
        // { test: /\.woff$/, loader: "file" },
        // { test: /\.woff2$/, loader: "file" },
        // { test: /\.ttf$/, loader: "file" },
        // { test: /\.eot$/, loader: "file" },
        // { test: /\.svg$/, loader: "file" }
    ]
}

var plugins = [
    new ExtractTextPlugin("[name].css", {
        disable: false,
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        inject: true,
        hash: true,
        excludeChunks: ["wallet"],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    // new HtmlWebpackPlugin({
    //     filename: './index.jsp',
    //     template: './src/index.jsp',
    //     inject: true,
    //     hash: true,
    //     excludeChunks: ["wallet"],
    //     minify: {
    //         removeComments: true,
    //         collapseWhitespace: false
    //     }
    // }),
    // new HtmlWebpackPlugin({
    //     filename: './wallet.html',
    //     template: './src/index.html',
    //     inject: true,
    //     hash: true,
    //     excludeChunks: ["main"],
    //     minify: {
    //         removeComments: true,
    //         collapseWhitespace: false
    //     }
    // }),
    // new HtmlWebpackPlugin({
    //     filename: './wallet.jsp',
    //     template: './src/index.jsp',
    //     inject: true,
    //     hash: true,
    //     excludeChunks: ["main"],
    //     minify: {
    //         removeComments: true,
    //         collapseWhitespace: false
    //     }
    // }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.optimize.CommonsChunkPlugin('common',"common.js", ['main']),
]



module.exports = {
    entry: entrys,
    output: output,
    module: modules,
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css'],
    },
    vue: isProduction ? {
        loaders: {
            css: ExtractTextPlugin.extract("css")
        }
    } : {},
    plugins: isProduction ? plugins : []
}