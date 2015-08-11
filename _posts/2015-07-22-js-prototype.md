---
layout: post
title: js 对象、原型、继承
description: js 对象、原型、继承
keywords: js，对象，原型，原型链，构造函数，继承
category: "javascript"
---


###普通对象与函数对象

对象分普通对象和函数对象，`Object`、`Function`是js自带的函数对象。

<!-- more -->

```js
function f1(){};
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

var o3 = new f1();
var o1 = {};
var o2 =new Object();

console.log(typeof Object); //function
console.log(typeof Function); //function
console.log(typeof o1); //object
console.log(typeof o2); //object
console.log(typeof o3); //object
console.log(typeof f1); //function
console.log(typeof f2); //function
console.log(typeof f3); //function 
```

以上例子说明：**凡是通过 `new Function()` 创建的对象都是函数对象，其他的都是普通对象。** <br>

###原型对象

在js中，每当定义一个对象（函数）时候，对象中都会包含一些预定义的属性。其中函数对象的一个属性就是原型对象 `prototype`。

**注：**普通对象没有`prototype`,但有`__proto__`属性(可以在chrome中查看该属性，但最后不要依赖使用此属性)。

原型对象其实就是普通对象（`Function.prototype`除外,它是函数对象，但它很特殊，他没有`prototype`属性（前面说道函数对象都有`prototype`属性））。看下面的例子：

```js
function f1(){};
console.log(f1.prototype) //f1{}
console.log(typeof f1. prototype) //Object
console.log(typeof Function.prototype) // Function，这个特殊
console.log(typeof Object.prototype) // Object
console.log(typeof Function.prototype.prototype) //undefined
```

从这句 `console.log(f1.prototype) //f1 {}` 的输出就结果可以看出，`f1.prototype`就是f1的一个实例对象。就是在f1创建的时候,创建了一个它的实例对象并赋值给它的`prototype`，基本过程如下：

```js
var temp = new f1();
f1. prototype = temp;
```

所以，`Function.prototype`为什么是函数对象就迎刃而解了，上文提到凡是`new Function()`产生的对象都是函数对象，所以`temp1`是函数对象。

```js
var temp1 = new Function ();
Function.prototype = temp1;
```

###原型与构造函数

Js所有的函数都有一个`prototype`属性，这个属性引用了一个对象，即原型对象，也简称原型。这个函数包括构造函数和普通函数，我们讲的更多是构造函数的原型，但是也不能否定普通函数也有原型。譬如普通函数：

```js
function F(){
	//...
}
alert(F.prototype instanceof Object) //true
```

构造函数，也即构造对象。首先了解下通过构造函数实例化对象的过程。

```js
function A(x){
    this.x=x;
}
var obj = new A(1);
```

####new

`new` 也就是实例化对象，过程可以分如下几步：

1. 创建`obj`对象，`obj = new Object()`;
2. 将`obj`的内部`__proto__`指向构造它的函数`A`的`prototype`，同时，`obj.constructor === A.prototype.constructor`(这个是永远成立的，即使`A.prototype`不再指向原来的A原型，也就是说：**类的实例对象的`constructor`属性永远指向"构造函数"的`prototype.constructor`**)，从而使得`obj.constructor.prototype`指向`A.prototype`（`obj.constructor.prototype===A.prototype`，当`A.prototype`改变时则不成立，下文有遇到）。`obj.constructor.prototype`与的内部`_proto_`是两码事，实例化对象时用的是`_proto_`，`obj`是没有`prototype`属性的，但是有内部的`__proto__`，通过`__proto__`来取得原型链上的原型属性和原型方法，chrome暴露了`__proto__`，可以在chrome中`alert(obj.__proto__)`；
3. 将`obj`作为`this`去调用构造函数A，从而设置成员（即对象属性和对象方法）并初始化。

当这3步完成，这个`obj`对象就与构造函数`A`再无联系，这个时候即使构造函数`A`再加任何成员，都不再影响已经实例化的`obj`对象了。此时，`obj`对象具有了`x`属性，同时具有了构造函数`A`的原型对象的所有成员，当然，此时该原型对象是没有成员的。

**原型对象初始是空的**，也就是没有一个成员（即原型属性和原型方法）。可以通过如下方法验证原型对象具有多少成员。

```js
var num=0;
for(o in A.prototype) {
    alert(o);//alert出原型属性名字
    num++;
}
alert("member: " + num);//alert出原型所有成员个数。
```

但是，一旦定义了原型属性或原型方法，则所有通过该构造函数实例化出来的所有对象，都继承了这些原型属性和原型方法，这是通过内部的`__proto__`链来实现的。譬如：

```js
A.prototype.say = function(){
    alert("Hi")
};
```

那所有的`A`的对象都具有了`say`方法，这个原型对象的`say`方法是唯一的副本给大家共享的，而不是每一个对象都有关于`say`方法的一个副本。

###原型链

原型链的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

简单回顾下构造函数、原型和实例的关系：

每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针（`prototype`），而实例则包含一个指向原型对象的内部指针（`__proto__`）。

js在创建对象（无论是普通对象还是函数对象）的时候，都有一个叫做`__proto__`的内置属性，用于指向创建它的函数对象的原型对象 `prototype`。以下面的例子为例：

```js
function Person(name){
	this.name = name
};
Person.prototype.getName = function(){
	return this.name; 
}
var zjh = new Person(‘zhangjiahao’);
zjh.getName(); //zhangjiahao

console.log(zjh.__proto__ === Person.prototype) //true
```

`Person.prototype`对象也有`__proto__`属性，它指向创建它的函数对象（`Object`）的 `prototype`

```js
console.log(Person.prototype.__proto__ === Object.prototype) //true
```

继续，`Object.prototype`对象也有`__proto__`属性，但它比较特殊，为`null`

```js
console.log(Object.prototype.__proto__) //null
```

###instanceof

```js
//demo
[1,2] instanceof Array  //true
new Object() instanceof Array  //false

[1,2] instanceof Object  //true
```

左侧一般是一个对象，右侧一定是个函数对象，不是函数对象会报错。

原理：右侧函数的`prototype`属性是否出现在左侧对象的原型链上。即：左侧的原型链上是否有右侧的原型。


###继承

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

####参考文章：

- <a rel="nofollow" href="http://www.nowamagic.net/librarys/veda/detail/1648" target="_blank" title="">JavaScript探秘：强大的原型和原型链</a>
- <a rel="nofollow" href="http://www.jb51.net/article/30750.htm" target="_blank" title="">js原型链看图说明</a>
- <a rel="nofollow" href="http://blog.jobbole.com/9648/" target="_blank">理解javascript原型</a>
- <a rel="nofollow" href="http://developer.51cto.com/art/200907/134913.htm" target="_blank">javascript类和继承:constructor</a>
- <a rel="nofollow" href="http://www.nowamagic.net/librarys/veda/detail/1642" target="_blank">javascript探秘:构造函数</a>
