const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: './index.tsx'
    },
    output: {
        filename: '[name].client.js',
        publicPath: '/',
        path: path.resolve(__dirname, '../dist/public')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },

    devServer: {
        port: 2000,
        historyApiFallback: true,
        static: [{
            directory: path.resolve(__dirname, 'public'),
            publicPath: '/',
            staticOptions: {
                redirect: true
            }
        }, {
            directory: path.resolve(__dirname, '../public'),
            publicPath: '/',
            staticOptions: {
                redirect: true
            }
        }
        ],
        proxy: {
            '/users': {
                target: 'http://localhost:2000',
                router: () => 'http://localhost:5000',
                logLevel: 'debug' /*optional*/
            },
            '/categories': {
                target: 'http://localhost:2000',
                router: () => 'http://localhost:5000',
                logLevel: 'debug'

            },
            '/products': {
                target: 'http://localhost:2000',
                router: () => 'http://localhost:5000',
                logLevel: 'debug'

            }
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            minify: {
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 'css-loader']
            }, {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.png$/,
                type: 'asset/resource'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }

}