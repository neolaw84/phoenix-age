const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // For minification

module.exports = {
  mode: 'production', // Set to 'development' for unminified builds
  entry: './src/index.ts', // Your main entry point
  output: {
    filename: 'phoenix-age.min.js', // Output filename (you can customize it)
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'PhoenixAge', // The name of the global variable exposed by your library (optional)
    libraryTarget: 'umd', // Supports various module formats (CommonJS, AMD, etc.) 
    globalObject: 'this', // For better browser compatibility
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,   // Enable minification
    minimizer: [new TerserPlugin()], // Use Terser for minification
  },
};