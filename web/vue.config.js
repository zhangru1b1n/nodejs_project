const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000',
        // pathRewrite:{'^/atguigu':''},
        // ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },
    }
  }
})
