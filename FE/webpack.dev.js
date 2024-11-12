/* eslint-disable linebreak-style */
import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.cjs';

const __dirname = path.resolve();
export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    compress: true,
  },
});