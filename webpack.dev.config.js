const webpackConfigs = require('./webpack.config');

webpackConfigs.mode = 'development';

webpackConfigs.devServer = {
	port: process.env.PORT || 3000,
	open: true,
	hot: true,
	client: {
		overlay: {
			errors: true,
			warnings: false
		},
		progress: true
	}
};

webpackConfigs.entry = ['react-hot-loader/patch', './src'];

module.exports = webpackConfigs;
