const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/maker.ts",
  mode: "development",
  output: {
    filename: "main.js",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
      new CopyWebpackPlugin([
          { from: 'src/images', to:'images' },
      ]), 
  ],
  node: {
    __dirname: true
  },
  target: "node", // in order too ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
};
