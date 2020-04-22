const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const inputDir = path.resolve(__dirname, 'bin');
const buildDir = path.resolve(__dirname, '../cdk/resources');
const InputFilePattern = /^([a-z_]+)\.js$/;

const Entry = fs
  .readdirSync(inputDir)
  .filter((file) => InputFilePattern.test(file))
  .reduce((entry, file) => {
    const name = InputFilePattern.exec(file)[1];
    const newEntry = { ...entry };
    newEntry[name] = path.resolve(inputDir, file);
    return newEntry;
  }, {});

module.exports = {
  mode: 'production',
  entry: Entry,
  externals: ['aws-sdk'],
  output: {
    path: buildDir,
    filename: '[name]/[name].js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  plugins: [new CleanWebpackPlugin()],
};
