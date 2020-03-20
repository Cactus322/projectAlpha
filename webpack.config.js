const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
                    publicPath: './images/logo',
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
        new MiniCssExtractPlugin({
            template: './src/scss/pages/colors&type.scss',
            filename: './style/colors&type.css'
        }),

        new HtmlWebpackPlugin({
            template: './src/pug/pages/colors&type.pug',
            filename: 'index.html'
        }),

        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: 'images'
            }
        ]),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};