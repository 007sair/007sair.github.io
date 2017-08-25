---
layout: post
title: js 对象、原型、继承详解
description: js 对象、原型、继承介绍
tags:
 - javascript
categories:
 - javascript
---


## 对象

对象分普通对象和函数对象，`Object`、`Function`是js自带的函数对象。

<!-- more -->

```js
function f1(){};
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

var o3 = new f1();
var o1 = {};
var o2 = new Object();

console.log(typeof Object); //function
console.log(typeof Function); //function
console.log(typeof o1); //object
console.log(typeof o2); //object
console.log(typeof o3); //object
console.log(typeof f1); //function
console.log(typeof f2); //function
console.log(typeof f3); //function 
```

以上例子说明：**凡是通过 `new Function()` 创建的对象都是函数对象，其他的都是普通对象。** `Function`、`Object` 也都是通过`new Function()`创建的。

## 原型

js中所有的__函数__都有一个`prototype`属性，这个属性引用了一个对象，即原型对象，也简称原型。<br>
这个_函数_包括构造函数和普通函数，我们讲的更多是构造函数的原型，但是也不能否定普通函数也有原型。

**注：**普通对象没有`prototype`属性，但有内置属性：`__proto__`（可以在chrome中查看该属性，但不要依赖使用此属性）。

譬如普通函数：

```js
function f(){
    //...
}
alert(f.prototype instanceof Object) //true
```

构造函数，也叫构造对象。首先了解下通过构造函数实例化对象的过程。

```js
function A(x){
    this.x=x;
}
var a = new A(1);
```

### new

`new`也就是实例化对象，过程有如下几步：

1. 创建对象`o`;`var o = {};`
2. 将`o`内部的`__proto__`对象的引用指向`o`的构造函数`A`的原型对象（`A.prototype`）。
3. 将`o`作为`this`去调用构造函数A，从而设置`o`的属性和方法并初始化。

> 传送门：<a href="/javascript/2015/08/10/js-this.html#anchor3" target="_blank">模拟new操作符的内部处理过程</a>

当这3步完成，这个`o`对象就与构造函数`A`再无联系，这个时候即使构造函数`A`再加任何成员，都不再影响已经实例化的`o`对象了。<br>
此时，`o`对象具有了`x`属性，同时具有了构造函数`A`的原型对象的所有成员，当然，此时该原型对象是没有成员的。

**原型对象初始是空的**，也就是没有一个成员（即原型属性和原型方法）。可以通过如下方法验证原型对象具有多少成员。

```js
function A(name){
    this.name = name;
}

var num = 0;

A.prototype.say = function(){
    alert("Hi")
};

for(i in A.prototype){
    console.log(i);  //say
    num++;
}

console.log("member: " + num); // 1
```

解释了什么是原型对象，我们再来看看它的作用是什么，先看一段代码：

```js
function Person(name){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
var o = new Person('chan');
o.getName(); // chan
```

可以看到，通过给`Person.prototype`设置一个方法`getName`，实例后的对象`o`也会继承这个方法。具体怎么实现的继承，需讲到下面的原型链。


## 原型链

js在创建对象（无论是普通对象还是函数对象）的时候，都有一个叫做`__proto__`的内置属性，用于指向创建它的函数对象的原型对象`prototype`。

原型链的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

简单回顾下构造函数、原型和实例的关系：

每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针（`prototype`），而实例则包含一个指向原型对象的内部指针（`__proto__`）。

以下面的例子为例：

```js
function Person(name){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
var o = new Person('chan');
o.getName(); // chan

console.log(o.__proto__ === Person.prototype) //true
```

`Person.prototype`对象也有`__proto__`属性，它指向创建它的函数对象（`Object`）的 `prototype`：

```js
console.log(Person.prototype.__proto__ === Object.prototype) //true
```

继续，`Object.prototype`对象也有`__proto__`属性，但它比较特殊，为`null`

```js
console.log(Object.prototype.__proto__) //null
```

原型链如下图：

<img src="/images/img/js-prototype-lian.jpg" alt="">

##### 疑点解释：

```js
Object.__proto__ === Function.prototype // true     Object是函数对象，是通过new Function()创建，所以Object.__proto__指向Function.prototype。

Function.__proto__ === Function.prototype // true   Function 也是对象函数，也是通过new Function()创建，所以Function.__proto__指向Function.prototype。

Function.prototype.__proto__ === Object.prototype //true   Function.prototype是个函数对象，理论上他的__proto__应该指向 Function.prototype，就是他自己，自己指向自己，没有意义。
```

js一切皆为对象，原型链的最顶层为null，即`Object.prototype.__proto__ === null`



### instanceof

```js
//demo
[1,2] instanceof Array  //true
new Object() instanceof Array  //false

[1,2] instanceof Object  //true
```

左侧一般是一个对象，右侧一定是个函数对象，不是函数对象会报错。

原理：右侧函数的`prototype`属性是否出现在左侧对象的原型链上。即：左侧的原型链上是否有右侧的原型。

### constructor

原型对象`prototype`中都有预定义的`constructor`，用来指向它的构造函数。

```js
o.prototype.constructor === Person //true
Function.prototype.constructor === Function //true
Object.prototype.constructor === Object //true
```


## 继承

因为ECMAscript的发明者为了简化这门语言，同时又保持继承性，采用了链式继承的方法。 <br>
由构造函数创建的每个实例都有个`__proto__`属性，它指向构造函数的`prototype`。那么构造函数的`prototype`上定义的属性和方法都会被instance所继承.

```js
function Person(){
	//...
}
function Student(){
	//...
}

Student.prototype = Person.prototype;	//不可以这样继承，改变Student的同时，也会改变Person，因为他们是引用

Student.prototype = new Person();	
//可以实现 new Person的时候得到了Person的实例，并且Person的实例指向了Person.prototype 并且调用了构造函数。不过因为调用了构造函数，在Person有参数时此方法不太好使

//仅ES5+支持
Student.prototype = Object.create(Person.prototype);	//Object.create的作用：创建以个空对象，并且这个空对象的原型指向传入的参数，即Person.prototype

Student.prototype.constructor = Person;

if(!Object.create){
	//proto 为原型对象
	Object.create = function(proto){
		function F(){};
		F.prototype = proto;
		return new F;
	}
}

```

<br>

__参考自：__

- <a rel="nofollow" href="http://www.108js.com/article/article1/10201.html?id=1092" target="_blank" title="">JS原型与原型链终极详解</a>
- <a rel="nofollow" href="http://www.nowamagic.net/librarys/veda/detail/1648" target="_blank" title="">JavaScript探秘：强大的原型和原型链</a>
- <a rel="nofollow" href="http://www.jb51.net/article/30750.htm" target="_blank" title="">js原型链看图说明</a>
- <a rel="nofollow" href="http://blog.jobbole.com/9648/" target="_blank">理解javascript原型</a>
- <a rel="nofollow" href="http://developer.51cto.com/art/200907/134913.htm" target="_blank">javascript类和继承:constructor</a>
- <a rel="nofollow" href="http://www.nowamagic.net/librarys/veda/detail/1642" target="_blank">javascript探秘:构造函数</a>