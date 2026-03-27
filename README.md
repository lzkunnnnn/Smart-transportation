### 提示
该项目仅为前端页面，无后端代码与数据库。

### 文件目录说明
```

├── mock                             ---mock模拟数据
├── public                           ---静态资源文件
├── src          
│  ├── api                           ---接口     
│  ├── assets                        ---图片
│  ├── components                    ---可复用的vue组件
│  ├── layouts                       ---布局方式
│  ├── router                        ---路由
│  ├── store                         ---vuex
│  ├── styles                        ---sass样式
│  ├── utils                         ---方法函数
│  ├── vendor                        ---导出excel
│  ├── views                         ---页面
│  ├── App.vue                       
│  ├── main.js            
│  ├── permission.js                 ---路由拦截           
├── tests                            ---单元测试文件
├── .browserslistrc
├── .env
├── .eslintrc.js
├──  babel.config.js
├── .jest.config.js                  ---jest的配置
├──  package.json
├──  package-lock.json
├──  README.md
└──  vue.config.js                   ---webpack的配置


```


 
## 安装

```
# 克隆项目
git clone https://github.com/biubiubiu01/vue-antd-admin.git
# 进入项目目录
cd vue-antd-admin
# 安装依赖
npm install
# 本地开发 启动项目
npm run serve
```


### 部署

```
# 打包项目
npm run build
# 单元测试
npm run test:unit
```

## 问题补充
该框架默认全走---mock数据，根据.env直接修改端口为后台端口，会造成页面崩溃，
其次会有很多重复不必要的后台开发工作，如登陆页面。

因此修改了request.js和vue.config.js相关的封装文件，对接口做了不同的实现。

具体使用可参考
```src/api/user.js```文件（用户登陆的API）

```javascript
export function login(data) {
  return request.post('/user/login', data, {
    baseURL: '/mock'
  });
}
```
新增配置参数```baseURL```，如果需要用到mock中的模拟数据，
只需在参数重注明数据源取自 ```/mock``` 即可

如果用后端数据，则无视这个配置参数即可

默认情况下走的是后端接口，如需修改端口号，
在```.env```文件中的```VUE_APP_BASE_API```进行修改








