const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
// vue.config.js
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: "all",
    https: true,
    // webSocketServer: 'auto://0.0.0.0:0/ws'
  },
  lintOnSave: true,
  configureWebpack: {
    plugins: [

    ],
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc('src/assets')
      }
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
