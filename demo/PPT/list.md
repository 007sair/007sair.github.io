#讲解点：

## page1

封面

## page2

javascript之父介绍

## page3

语法简单，上手容易，少则数周就可以开发项目。除js本身，我们还会额外的学习一些其他技术栈，如：

- 原生JS的原型：`prototype`,`_proto__`
- 模块化：`RequireJS`,`SeaJS`
- 设计模式：`MVC`,`MV*`,`MVVM`
- 自动化：`npm`,`gulp`,`grunt`,`webpack`等
- 框架：`bootstrap`，`vue`，`react`，`angular`，`backbone`
- 库：`jquery`，`zepto`，`lodash`

## page4

问：技术栈存在的意义
答：小型项目，不用技术栈没有任何问题，但大型项目没有就很尴尬
问：难道js无法胜任大型项目的开发？
答：从前端发展的历史来看，我们需要重新认识认识js

## page5

前端的历史：

- **原始时代：** 网页制作（三剑客），代码靠生成，表单验证，简单特效（跑马灯）
- **石器时代：** div时代，手写代码，禅意花园，校内网皮肤，jquery（兼容）,Ajax（Gmail）
- **移动时代：** 重构，前端开发两个方向，H5/CSS3，zepto，jquery mobile，requirejs，seajs

`H5`：本地存储、canvas、SVG、多媒体、通信API（web sockets）

`CSS3`：新选择器、盒模型、变形动画、响应式、Font-face、oneDIV

js历史情况：

- 脚本语言 弥补网页开发buzu
- 辅助其他后台语言，如：表单验证
- 大神`Brendan Eich`  10天  设计
- 遵从`ECMAScript`标准 我说你是啥 你就是啥 我让你做什么  你就做什么  我是你大哥
- jQuery诞生  解决浏览器兼容性问题
- 解析器`chrome V8`  大神`Ryan Dahl` NodeJS
- web2.0  Ajax
- SPA单页应用

`ECMAScript6`：浏览器战争，第三方标准，推动js的发展（[大事件](http://007sair.github.io/demo/PPT/)）

## page6

**自动化时代：** 

- chrome V8
- NodeJS（Ryan Dahl）
- NPM、bower包管理工具
- 构建工具（资源合并、压缩、md5，css预处理）
- 框架（vue，react，angular）

## page7

spa？大型应用？特点：单页，逻辑全在前端，后端只出接口

大型应用或spa存在脚本文件多，依赖关系复杂，命名冲突，性能优化，团队协作等问题

- SPA（特点：单页，代码庞大，逻辑复杂）
    - n个引用库
    - n个html、css、js的静态资源
    - 多人、长时间维护
    - 代码庞大，逻辑复杂

一个大型的 JavaScript 项目通常需要解决哪些问题？

- 外部引用包的管理（npm、bower）
- 过多代码导致更新迭代、重构、维护难（需要封装，继承，面向对象，原型）
- 多人参与 职责区分（模块化，MVC / MVVM，前端框架流行，如react angular backbone）
- 页面性能（单页应用功能多，带宽浪费，特别移动端，requre.js / seajs）
- 静态资源的处理
    - 自动化，资源合并，压缩，版本号自动更改，
    - 自动解析依赖关系，异步请求，公共代码分离
    - css预处理，css也能像编程语言一样编写
    - 图片压缩，雪碧图，base64