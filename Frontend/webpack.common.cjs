/* eslint-disable no-undef *//* eslint-disable linebreak-style */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Tambahkan ini
const CompressionPlugin = require('compression-webpack-plugin');
const TesertPlugin = require('terser-webpack-plugin');
const glob = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;
module.exports = {
  entry: {
    app: path.resolve('src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Ubah 'style-loader' menjadi MiniCssExtractPlugin.loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
      new TesertPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('src/public/'),
          to: path.resolve('dist/'),
        },
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)$/,
          options: {
            quality: 75,
          },
        },
      ],
      overrideExtension: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new CompressionPlugin({
      filename: '[path][base].gz',     // Nama file output, [path] dan [base] mempertahankan struktur asli
      algorithm: 'gzip',               // Algoritma kompresi (gzip atau brotliCompress)
      test: /\.(js|css|html|svg)$/,    // Tentukan tipe file yang ingin dikompresi
      threshold: 8192,                 // Minimum ukuran file yang dikompresi (8KB)
      minRatio: 0.8,                   // Rasio minimum untuk kompresi (dengan 0.8, file dikompresi jika lebih kecil 80% dari ukuran asli)
      deleteOriginalAssets: false      // Jika `true`, menghapus file asli setelah kompresi (opsional)
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
    }),
  ],
};

