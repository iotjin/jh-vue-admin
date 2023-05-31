# jh-vue-admin

jh-vue-admin - vue极简后台管理系统，支持顶栏和固钉动态切换。[在线预览 https://iotjin.github.io/jh-vue-admin](https://iotjin.github.io/jh-vue-admin)
<br>
<br>


- 基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)项目`v4.0+` 版本
- 添加[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)项目`TagsView`功能
- [vue-element-admin 使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)
- 动态权限控制
- 添加`TopHeader`功能
- 动态获取菜单路由
- 基础系统设置模块（用户管理、角色管理、菜单管理、字典管理）
- 可视化用户角色、菜单权限、按钮权限配置

## 在线预览

  https://iotjin.github.io/jh-vue-admin

<br>

## vue-admin-template 介绍

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](http://panjiachen.github.io/vue-admin-template)

[国内访问](https://panjiachen.gitee.io/vue-admin-template)

目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0)，它不依赖 `vue-cli`。

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

## <a id="更新记录"></a> 更新记录
<details open id="重要更新">
  <summary><strong>重要更新</strong></summary>
   
```
* v1.6.0版本，添加系统设置模块
* v1.5.0版本，添加TopHeader功能
* v1.4.0版本，添加demos
* v1.3.0版本，添加tagsView显隐控制
* v1.2.0版本，添加权限控制
* v1.1.0版本，添加TagsView功能
* v1.0.0版本，添加vue-admin-template模板项目
```
</details>

## 分支
- `template`分支在`vue-admin-template`基础上添加了`TagsView`
- `permission-template`分支在`permission-control`基础上添加了`TagsView`
- `gh-pages`分支放置`dist`包，进行在线预览

## Build Setup

```bash
# 克隆项目
git clone https://github.com/iotjin/jh-vue-admin

# 进入项目目录
cd jh-vue-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

在线预览 [https://iotjin.github.io/jh-vue-admin](https://iotjin.github.io/jh-vue-admin)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |
