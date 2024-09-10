'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
// const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// const AutoDllPlugin = require('autodll-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '后台管理系统' // page title

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
    https: false,
    port: port,
    open: true, // 自动打开浏览器
    // hot: true, // 开启 HMR 功能
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js')
    before: process.env.VUE_APP_USE_MOCK === 'true' && require('./mock/mock-server.js')
    // before: (app) => {
    //   if (process.env.VUE_APP_USE_MOCK === 'true') {
    //     require('./mock/mock-server.js')(app)
    //   }
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: process.env.NODE_ENV === 'development' ? [
      // new webpack.HotModuleReplacementPlugin(), // HMR 使用
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      }),
      // 默认缓存位置：node_modules/.cache路径下
      new HardSourceWebpackPlugin()
      // new HardSourceWebpackPlugin({
      //   cacheDirectory: resolve('node_modules/.cache/hard_source_cache')
      // })
    ] : [
      // 去除console.log
      // new UglifyPlugin(),
      // 代码压缩
      // new CompressionPlugin()
    ],
    // plugins: [
    //   // new webpack.HotModuleReplacementPlugin(), // HMR 使用
    //   new BundleAnalyzerPlugin({
    //     // analyzerMode: 'disabled',
    //     openAnalyzer: false
    //   }),
    //   // 默认缓存位置：node_modules/.cache路径下
    //   new HardSourceWebpackPlugin()
    //   // new HardSourceWebpackPlugin({
    //   //   cacheDirectory: resolve('node_modules/.cache/hard_source_cache')
    //   // })
    //   //
    //   // 生成dll文件
    //   // new AutoDllPlugin({
    //   //   inject: true,
    //   //   debug: true,
    //   //   filename: '[name]_[hash].js',
    //   //   path: resolve('dll'),
    //   //   entry: {
    //   //     vendor: [
    //   //       'vue',
    //   //       'vue-router',
    //   //       'vuex'
    //   //     ]
    //   //   }
    //   // })
    // ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve('src'),
          exclude: /node_modules/,
          use: [
            'thread-loader', // 将后续 loader 放在 worker 池中执行
            // 耗时的 loader （例如 babel-loader）
            'babel-loader'
          ]
        }
      ]
    },
    // 设置通过cdn引入的库，不打包到vendor中（需要去掉导入的相关代码）, 需要在index.html中引入cdn资源
    externals: {
      // vue: 'Vue', // 使用cdn引用element-ui时，必须设置vue和element-ui为外部依赖。
      // 'element-ui': 'ELEMENT', // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
      // 'vue-router': 'VueRouter',
      // axios: 'axios',
      // echarts: 'echarts'
      // XLSX: 'XLSX'
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

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
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

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
                  priority: 25, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                echarts: {
                  name: 'chunk-echarts', // split echarts into a single package
                  priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
                },
                xlsx: {
                  name: 'chunk-xlsx', // split xlsx into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/](xlsx|file-saver)[\\/]/ // in order to adapt to cnpm
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
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
