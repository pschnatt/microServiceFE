const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3008,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,  // Rule to handle CSS files
        use: ['style-loader', 'css-loader'],  // Use these loaders for CSS
      },
      {
        test: /\.(png|jpg|gif)$/i,   // Handle image files
        type: 'asset/resource',     // Use Webpack's built-in handling for images
     },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'app8',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true },  "react-router-dom": { singleton: true }  },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};