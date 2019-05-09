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
        path: path.resolve(__dirname, 'dist'),
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
                    outputPath: '../dist/assets/icons',
                    publicPath: 'icons',
                },
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../dist/assets/images',
                    publicPath: 'images',
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../dist/assets/fonts',
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
        new MiniCssExtractPlugin({
            filename: "../dist/assets/css/styles.css",
        }),
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3002,
        proxy: {
            '/**': {
                target: '/index.html',
                bypass(req){
                    if(req.headers.accept.indexOf('html') !== -1){
                        return '/index.html';
                    }

                    return '';
                }
            }
        },        
    },

    devtool: 'none',
};