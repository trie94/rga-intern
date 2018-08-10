const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: { minimize: true }
            }
        },
        {
            test: /\.css$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                'css-loader'
            ],
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name:'[path][name].[ext]'
                    }
                }
            ]
        }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: './src/html/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            title: 'Production',
            filename: './component/*/*.css',
            chunkFilename: '[id].css'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}