const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },


    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: './images/all',
                    outputPath: '/images/'
                },
            },
            {
                test: /\.(woff|woff2|svg|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]/[name].[ext]',
                    publicPath: './fonts/',
                    outputPath: 'style/fonts/'
                },
            },
        ],
    },

    plugins: [
        /*new MiniCssExtractPlugin({
            template: './src/scss/Ui kit/colors&type.scss',
            filename: './style/colors&type.css'
        }), */

       /* new MiniCssExtractPlugin({
            template: './src/scss/Ui kit/headers&footers.scss',
            filename: './style/headers&footers.css'
        }),*/

        new MiniCssExtractPlugin({
            template: './src/scss/Ui kit/formElements.scss',
            filename: './style/formElements.css'
        }),

        /*new HtmlWebpackPlugin({
            template: './src/pug/Ui kit/colors&type.pug',
            filename: 'index.html'
        }),*/

        /*new HtmlWebpackPlugin({
            template: './src/pug/Ui kit/headers&footers.pug',
            filename: 'index.html'
        }),*/

        new HtmlWebpackPlugin({
            template: './src/pug/Ui kit/formElements.pug',
            filename: 'index.html'
        }),
        /*new HtmlWebpackPlugin({
            template: './src/test/test.pug',
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            template: './src/test/test.scss',
            filename: './style/test.css'
        }),*/

        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: 'images'
            }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};