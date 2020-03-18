const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                test: /\.pug$/,
                use: [
                    'html-loader',
                    'pug-html-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|svg|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]/[name].[ext]',
                    publicPath: './fonts.scss/',
                    outputPath: 'style/fonts.scss/'
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            template: './src/scss/all.scss',
            filename: './style/all.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/pages/ui-kit.pug',
            filename: 'index.html'
        }),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};