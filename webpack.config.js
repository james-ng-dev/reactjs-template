const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

dotenv.config();

const VENDOR_LIBS = ['react', 'react-dom'];

const environment = process.env.NODE_ENV;

const webpackConfigs = {
	mode: environment,
	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, 'node_modules/'),
				use: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: true,
							importLoaders: 1,
							localIdentName: '[name]-[local]__[hash:base64:5]'
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								indentWidth: 1
							}
						}
					}
				]
			},
			{
				test: /\.(css)$/,
				exclude: /node_modules/,
				use: [
					'css-hot-loader',
					'style-loader',
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'css-hot-loader',
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				loader: 'file-loader',
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html')
		}),
		new DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
			BACKEND_URL: JSON.stringify(process.env.BACKEND_URL)
		})
	],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@talons': path.resolve(__dirname, './src/talons'),
			'@helpers': path.resolve(__dirname, './src/helpers'),
			'@util': path.resolve(__dirname, './src/util'),
			'@public': path.resolve(__dirname, './public')
		}
	}
};

module.exports = webpackConfigs;
