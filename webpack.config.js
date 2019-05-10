const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',

    entry: {
        bundle: path.resolve(__dirname, 'src','app.js'),
        functions: path.resolve(__dirname, 'src','functions.js'),
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/assets/js'),
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.ico$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../icons',
                    publicPath: 'icons',
                },
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../images',
                    publicPath: 'images',
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../fonts',
                    publicPath: 'fonts',
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            // Injetando o Jquery ao site
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether'
        }),
        new MiniCssExtractPlugin({
            filename: "../css/styles.css",
        }),
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3002,
        inline: true,
        hot: true,     
    },

    devtool: 'none',
};