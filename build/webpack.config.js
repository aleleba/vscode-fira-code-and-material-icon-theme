'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname);

const copyPatterns = [
	{
		from: `${ROOT_DIR}/../fonts/fira-code-vf.woff`, to: '[name][ext]',
	}
];

/** @type {import('webpack').Configuration} */
const config = {
  context: path.dirname(__dirname),
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './material-icon-theme/src/extension.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    clean: true,
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
		new CopyPlugin({
			patterns: copyPatterns
		}),
	],
};

module.exports = config;
