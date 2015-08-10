---
layout: post
title: sass笔记
description: sass笔记
keywords: sass, study
category: "sass"
---


###变量

**命名：** `$`	<br>
**规则：**

- 作用域：作用域同js，想调用局部变量可使用 `!global` 
- 默认值：变量没有设置具体值时，使用 `!default`

<!-- more -->

```scss
//demo
$primaryColor: #eeccff;
$firstValue: 62.5%;
$firstValue: 24px !default;
body {
	$primaryColor: #ccc;
	background: $primaryColor; //编译后#ccc
	font-size: $firstValue; //编译后62.5%;
}
p {
	color: $primaryColor; //编译后#eeccff
}
```

###数学计算

**坑：**

1. 因为 `/` 符号用来简写CSS字体属性，比如font: 14px/16px，所以如果你想在非变量值上使用除法操作符，那么你需要使用括号包裹它们：

	```scss
	$fontDiff: (14px/16px);
	```

2. 第二，不可以混合使用值的单位：

	```scss
	$container-width: 100% - 20px;
	```

###嵌套

sass写法：引用父选择器可以通过 `&` 符合实现：

```scss
a.myAnchor {
	color: blue;
	&:hover {
		text-decoration: underline;
	}
	&:visited {
		color: purple;
	}
}
```
离开嵌套回到顶层选择器，那么我们可以使用 `@at-root` 指令

```scss
.first-component {
	.text { font-size: 1.4rem; }
	.button { font-size: 1.7rem; }
	@at-root .second-component {
		.text { font-size: 1.2rem; }
		.button { font-size: 1.4rem; }
	}
}
```

> Inception Rule:选择器深度不要超过四层。——thesassway


###引用

**@import**

语法格式如下：

```scss
@import "reset.scss";
//or
@import "reset";
```

引用的scss文件会被自动编译成对应的css文件。如：`reset.scss`会被自动编译成 `reset.css`，解决这个问题可以给`reset.scss`文件名重命名为：`_reset.scss`。<br>
当然，`import`的引用里不需要加`_`。

###扩展、占位符

**@extend**

使用`@extend`指令扩展input类，指向input-error类

```scss
.input {
	border-radius: 3px;
	border: 4px solid #ddd;
	color: #555;
	font-size: 17px;
	padding: 10px 20px;
	display: inline-block;
	outline: 0;
}
.error-input {
	@extend .input;
	border:4px solid #e74c3c;
}
```

**请注意：**这么做并不会从.input复制样式到.error-input中。

编译后如下：

```css
.input, .error-input {
	border-radius: 3px;
	border: 4px solid #ddd;
	color: #555;
	font-size: 17px;
	padding: 10px 20px;
	display: inline-block;
	outline: 0;
}
.error-input {
	border: 4px solid #e74c3c;
}
body {
	text-align: center;
	padding-top: 100px;
}
```

如果我们想声明的扩展来自尚未实现的样式集，那该如何做呢？占位符选择器就可以解决这个问题。<br>
声明占位符选择器需要在目标类名上前缀一个%符号。只有当扩展它的元素被渲染时，占位符选择器才会被编译输出。

```scss
%input-style {
	border-radius: 3px;
	color: #555;
	font-size: 17px;
	padding: 10px 20px;
	display: inline-block;
	outline: 0;
}
.input {
	@extend %input-style;
	border: 4px solid #ddd;
}
.error-input {
	@extend %input-style;
	border:4px solid #e74c3c;
}
```

编译后：

```scss
.input, .error-input {
	border-radius: 3px;
	color: #555;
	font-size: 17px;
	padding: 10px 20px;
	display: inline-block;
	outline: 0;
}
.input {
	border: 4px solid #ddd;
}
.error-input {
	border: 4px solid #e74c3c;
}
```

###混合宏

混合宏是Sass令人惊艳的特性，因为它在让你实现类似@extend功能的同时还提供了传参的功能。Sass使用@mixin指令定义混合宏，并使用@include指令引入。

**1. 定义混合宏**

```scss
@mixin media($queryString){
	//...
}
```

注意我们在混合宏media中声明了一个$queryString参数。当我们引入混合宏时，可以一个字符串参数以实现动态渲染。

```scss
@mixin media($queryString){
	@media #{$queryString} {
		@content;
	}
}
```

因为我们期待字符串参数被目标函数使用，所以使用了Sass的插值语法，#{}。当你传递变量到这个括号中时，变量会像字符串一样输出而不是进行某种逻辑运算。
这个例子中另一个生疏的地方是@content指令。当你使用的混合宏后接被大括号包裹的样式，那么被包裹样式就可以通过@content指令加以使用。

```scss
//demo
@mixin media($queryString){
	@media #{$queryString} {
		@content;
	}
}

.container {
	width: 900px;
	@include media("(max-width: 767px)"){
		width: 100%;
	}
}
```

编译后：

``` css
.container {
	width: 900px;
}
@media (max-width: 767px) {
	.container {
		width: 100%;
	}
}
```

###函数

官方列表：<a href="http://sass-lang.com/documentation/Sass/Script/Functions.html" target="_blank" title="函数列表">函数列表</a>

在Sass中，函数指令类似于混合宏，它们会通过@return指令返回值而不是返回样式。这可以降低代码中的重复率并提高可读性。

创建一个函数指令以清除grid例子中的grid运算式：

```scss
@function getColumnWidth($width, $columns, $margin){
	@return ($width / $columns) - ($margin * 2);
}
```

应用到实际代码：

```scss
$container-width: 100%;
$column-count: 4;
$margin: 1%;
.container {
	width: $container-width;
}
.column {
	background: #1abc9c;
	height: 200px;
	display: block;
	float: left;
	width: getColumnWidth($container-width,$column-count,$margin);
	margin: 0 $margin;
}
```

**<a href="http://sassmeister.com/gist/0a041d0fb2d72758c280" target="_blank" title="">演示demo</a>**

