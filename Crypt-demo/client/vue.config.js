const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true
//       }
//     }
//   }
// }

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})