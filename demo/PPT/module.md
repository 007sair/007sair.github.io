# 模块化

## 历史

### 无模块化时代

```
if(xx) {
    //.......
} else {
    //xxxxxxxxxxx
}
for(var i=0; i<10; i++) {
    //........
}
element.onclick = function() {
    //.......
}
```

代码简单的堆在一起，只要能从上往下依次执行就可以了。

### 萌芽时代

ajax出现后页面逻辑复杂，代码庞大，问题也越来越多：

- 全局变量的灾难
- 函数命名冲突
- 依赖关系不好管理
        
        <script type="text/javascript" src="a.js"></script>
        <script type="text/javascript" src="b.js"></script>

**解决方法：**

- 自执行函数包装
- 命名空间
- 匿名自执行函数

### 模块化面临什么问题

从以上的尝试中，可以归纳出js模块化需要解决那些问题：

1. 如何安全的包装一个模块的代码？（不污染模块外的任何代码）
2. 如何唯一标识一个模块？
3. 如何优雅的把模块的API暴漏出去？（不能增加全局变量）
4. 如何方便的使用所依赖的模块？

围绕着这些问题，js模块化开始了一段艰苦而曲折的征途。

## 模块的职责

- 封装实现（将复杂的内容于外界个例）
- 暴露接口（外部可通过接口使用模块）
- 声明依赖（提供给模块系统使用）

> JavaScript的模块组织都是以文件形式组织，并非其他语言中的工程模块化

其他语言对模块的支持

- Java - `import`
- C# - `using`
- CSS - `@import`

JavaScript代码都是以.js文件的形式存在，并没有其他语言的模块组织，所以衍生出很多模块系统。

## 模块的管理

复杂的模块管理，不能单纯的通过代码文件的排列顺序来进行管理。于是引入了模块系统，它有下面的职责：

- 依赖管理（加载、分析、注入、初始化—）
- 决定模块的写法

常用模块系统：`CommonJS`、`AMD`、语言基本的模块化

## CommonJS

CommonJS 是一个模块规范，通常适用于非浏览器环境（NodeJS）。

**math.js**
```
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
exports.add = add;
exports.sub = sub;
```

**calculator.js**
```
// 依赖声明
var math = require('./math.js');

function Calculator(container) {
  // ...
}
Calculator.prototype.compute = function(){
  this.result.textContent = math.add(...);
}

// 接口暴露
exports.Calculator = Calculator;
```

**优点：**

- 依赖管理成熟可靠
- 社区活跃且规范接受度高
- 运行时支持且模块化定义简单
- 文件级别的模块作用域隔离
- 可以处理循环依赖

**缺点：**

- 不是标准组织规范
- 同步请求未考虑浏览器环境（可以使用 Browserify 来解决）

## AMD（Asynchronous Module Definition）

适合异步环境的依赖管理方案，AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。

**math.js**
```
//   依赖列表
//      |
define([], function(){
    function add(a, b) { return a + b; }
    function sub(a, b) { return a - b; }

    //接口暴露  
    return {
        add: add,
        sub: sub
    }
})
```

**calculator.js**
```
define(['./math'], function(math){
    function Calculator(container) {
        //...
    }
    Calculator.prototype.compute = function(){
        this.result.textContent = math.add(...);
    };

    //暴露接口
    return {
        Calculator: Calculator;
    }
})
```

**优点：**

- 依赖管理成熟可靠
- 社区活跃且规范接受度高
- 转为异步环境制作，适合浏览器
- 支持 CommonJS 的书写方式
- 通过插件 API 可以加载非 JavaScript 资源
- 成熟的打包构建工具，并可结合插件一同使用


**缺点：**

- 模块定义繁琐，需要额外嵌套
- 酷基本的支持，需要引入额外的库
- 无法处理循环依赖
- 无法实现条件加载


## CommonJS 

CMD是SeaJS 在推广过程中对模块定义的规范化产出 

**math.js**
```
//   依赖列表
//      |
define([], function(){
    function add(a, b) { return a + b; }
    function sub(a, b) { return a - b; }

    //接口暴露  
    return {
        add: add,
        sub: sub
    }
})
```

**calculator.js**
```
define(function(require, exports){
  // 依赖声明
  var math = require('./math.js');

  function Calculator(container) {
    // ...
  }
  Calculator.prototype.compute = function(){
    this.result.textContent = math.add(...);
  }

  // 接口暴露
  exports.Calculator = Calculator;
})
```

## AMD与CMD的区别

- 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
- CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

```
// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
})

// CMD
define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
})
```

## UMD

通用模块规范，介于AMD与CMD之间

```
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
}(this, function($) {
  // 方法
  function myFunc() {};

  // 暴露公共方法
  return myFunc;
}));
```

## ECMAScript 6 Module

ECMAScript 6 中的模块化管理。

**math.js**
```
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a- b;
}
// export 关键字暴漏接口
export {add, sub}
```

**calculator.js**
```
import {add} from './math';

class Calculator {
  constructor(container) {}
  compute(){
    this.result.textContent = add(+this.left.value, +this.right.value);
  }
}
export{Calculator}
```

**优点：**

- 真正的规范未来标准
- 语言基本支持
- 适用于所有的 JavaScript 允许环境
- 可用于处理循环依赖

**缺点：**

- 规范未达到稳定级别
- 暂无浏览器支持
- 需要使用自动化转译

### 模块管理的对比

- AMD，可以直接使用，库基本的支持。
- CommonJS，可以直接使用，在运行时的支持。
- ES6，语言本身的支持。

使用插件工具，可以将三种模块管理系统进行相互转换。

附送：https://github.com/jobbole/awesome-javascript-cn