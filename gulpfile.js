'use strict';

//require('babel-core/register');

var gulp = require('gulp');
var fs = require('fs');
var shell = require('gulp-shell');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('build-spa', function (callback) {

	var buildConfig = Object.create(webpackConfig);

	buildConfig.debug = false;
	buildConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
	buildConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': '"production"'
		}
	}));

	webpack(buildConfig, function (err, stats) {
		if (err) {
			callback(err);
		}
		else {
			console.log(stats.toString({ chunks: false, colors: true }));
			callback();
		}
	});
});


var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

gulp.task('spa-server', function () {

	var compiler = webpack(webpackConfig);

	var server = new WebpackDevServer(compiler, {
		contentBase: path.join(__dirname, 'www'),
		quiet: false,
		noInfo: false,
		publicPath: '/dist/spa/',
		stats: { chunks: false, colors: true }
	});

	server.listen(5000, '0.0.0.0', function (err) {
		if (err) {
			console.log('could not start spa server');
			console.error(err);
		}
	})
});

gulp.task('copy-js', () => {
	//version
	let folders = fs.readdirSync('/Users/Ben/Git-Repos/wa-clone-site/spa');
	let max = -1;
	for (let i = 0; i < folders.length; i++) {
		if (isNaN(folders[i]))
			continue;
		if (folders[i] > max)
			max = Number(folders[i]);
	}
	max = max + 1;
	gulp.src('dist/spa/*')
		.pipe(gulp.dest(`/Users/Ben/Git-Repos/wa-clone-site/spa/${max}`));
});

gulp.task('git-push-site', shell.task(
	[
		"git -C '/Users/Ben/Git-Repos/wa-clone-site' status", 
		"git -C '/Users/Ben/Git-Repos/wa-clone-site' add .", 
		"git -C '/Users/Ben/Git-Repos/wa-clone-site' commit -m 'multi versions of spa'", 
		"git -C '/Users/Ben/Git-Repos/wa-clone-site' push origin master", 
	])
);