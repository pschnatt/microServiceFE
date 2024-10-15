const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable CORS
    },
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.(png|jpg|gif)$/i,   // Handle image files
        type: 'asset/resource',     // Use Webpack's built-in handling for images
     },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        mfe1: 'app1@http://localhost:3001/remoteEntry.js',
        mfe2: 'app2@http://localhost:3002/remoteEntry.js',
        mfe3: 'app3@http://localhost:3003/remoteEntry.js',
        mfe4: 'app4@http://localhost:3004/remoteEntry.js',
        mfe5: 'app5@http://localhost:3005/remoteEntry.js',
        mfe6: 'app6@http://localhost:3006/remoteEntry.js',
        mfe7: 'app7@http://localhost:3007/remoteEntry.js',
        mfe8: 'app8@http://localhost:3008/remoteEntry.js',
        mfe9: 'app9@http://localhost:3009/remoteEntry.js',
        mfe10: 'app10@http://localhost:3010/remoteEntry.js',
        mfe11: 'app11@http://localhost:3011/remoteEntry.js'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true }, "react-router-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
