declare var require: any;
declare var __dirname: string;

let path = require("path");
let webpack = require("webpack");

export = {
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, "build/index.js"),
    pathinfo: true
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process": "(" + JSON.stringify({env: {NODE_ENV: "production"}}) + ")"
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=imgs/[name].[ext]&limit=10240'
      },
    ]
  },

  resolve: {
    extensions: ['.css', '.js'],
    modules: [
      "src",
      "css",
      "node_modules",
    ],
  },

  resolveLoader: {
    modules: ['node_modules']
  },
}