'use strict'
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");
const defaultSettings = require('./src/settings.js')
const webpack = require('webpack')
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '个人阅读分享' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    host: '0.0.0.0',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    externals: {
     'jquery' : '$',
     'axios': 'axios',
     'vue': 'Vue',
     'vuex': 'Vuex',
     'vue-router': 'VueRouter'
    },
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
/*      if (process.env.use_analyzer) { // 添加分析工具
      config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
     } */
    // 解决quill-image-resize-module导入问题, https://github.com/kensnyder/quill-image-resize-module/issues/54
    config.plugin('provide').use(webpack.ProvidePlugin, [{
          'window.Quill': 'quill'
    }])

    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    config.module
    .rule('images')
      .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 2000, esModule: false })).end()
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true,
        options.esModule = false
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
            config.module
            .rule('image')
            .test(/\.(png|jpe?g|gif)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                // 此处为ture的时候不会启用压缩处理,目的是为了开发模式下调试速度更快
                disable: process.env.NODE_ENV == 'development' ? true : false
            })
            .end()
/*             config.module
            .rule('file')
            .test(/\.(eot|woff2?|ttf|svg)$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                // 此处为ture的时候不会启用压缩处理,目的是为了开发模式下调试速度更快
                disable: process.env.NODE_ENV == 'development' ? true : false
            })
            .end() */
            config.optimization.minimizer([
              new TerserPlugin({
                cache: true,//降版本后添加
                // 多进程
                parallel: true,//降版本后添加
                terserOptions: {
                  ecma: undefined,
                  warnings: false,
                  parse: {},
                  compress: {
                    drop_console: true,
                    drop_debugger: false,
                    pure_funcs: ['console.log'], // 移除console
                  },
                },
              })
          ]).end
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
