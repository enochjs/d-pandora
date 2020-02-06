const webpack = require('webpack')
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const version = require('../package.json').version

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    patch: 'react-hot-loader/patch',
    server: 'webpack-dev-server/client?http://127.0.0.1:3001',
    main: path.resolve(__dirname, '../src/view/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://127.0.0.1:3001/',
    hotUpdateMainFilename: '__hmr/[hash].hot-update.json',
    hotUpdateChunkFilename: '__hmr/[id].[hash].hot-update.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src/view'),
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, '../src/view/tsconfig.json'),
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
              })]
            }),
          },
        }]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              modifyVars: { 'font-size-base': '12px' },
              javascriptEnabled: true,
            },
          }
        ],
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      pages: path.resolve(__dirname, '../src/view/pages'),
      components: path.resolve(__dirname, '../src/view/components'),
      utils: path.resolve(__dirname, '../src/view/utils'),
      api: path.resolve(__dirname, '../src/view/api'),
      store: path.resolve(__dirname, '../src/view/store'),
    }
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist/',
    historyApiFallback: true,
    hotOnly: true,
    host: '127.0.0.1',
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    }
  },
}
