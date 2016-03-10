## 眯客微信H5
*******

架构采用 [vue.js](http://cn.vuejs.org/) + webpack

### 安装
***
```shell
    git clone git@gitlab.imike.com:front-end/wechat-mike.git 
    
    npm install
```
*需要Node.js*

### 开发环境
***
1. $ `npm run dev` 同 `webpack-dev-server --inline  --hot --port 9999 --host 0.0.0.0` 自动刷新 `localhost:9999`
1. $ `gulp` 可以启用mockup，多屏幕实时刷新

### 生产环境
***
1. $ `npm run build` 生成 dist
 
### 结构说明
***
```
    ├── README.md           
    ├── src/                // 生产目录
    │   ├── assets          // css  和图片资源
    │   ├── libs            // JS组件
    │   ├── components      // 各种组件
    │   ├── views           // 各种页面
    │   └── app.js          // Webpack 预编译入口
    ├── mockup/             // 切图目录
    │   └── wechat4.0       // 切图版本
    ├── dist/               // 项目build目录
    ├── index.html          // 项目入口文件
    ├── package.json        // 项目配置文件
    ├── webpack.config.js   // Webpack 配置文件
    └── gulpfile.js             // gulp 配置文件
```