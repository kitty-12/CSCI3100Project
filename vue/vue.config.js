module.exports = {
    devServer: {
        disableHostCheck: false,
        //host: "localhost",//or 192.128.1.103
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api':{
              target:'http://localhost:3000',  //请求接口的域名
              // secure: false, // 如果是https接口，需要配置这个参数
              changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
              pathRewrite:{
                '^/api':'' //rewrite the address，which means to use'/api' to replace the addresss in target.
              }
          },
        }
    },
};
