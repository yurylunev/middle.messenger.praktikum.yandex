const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

const config = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: ['/node_modules/', '/.spec.ts$/'],
      },
      {
        test: /\.(pcss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.(svg|png)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        }],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
  }), new CssMinimizerPlugin(), new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: true,
        },
        extractComments: false,
      })],
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    hot: true,
    compress: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 1234,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
  }

  if (argv.mode === 'production') {
    config.devtool = false;
  }

  return config;
};
