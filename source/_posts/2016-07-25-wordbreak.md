---
layout: post
title: word-wrap与word-break的区别
description: word-wrap与word-break的区别
keywords: css word-wrap word-break
tags:
 - html
categories:
 - html
---

<style>
div{
    word-break: normal;
    word-wrap: normal;
}
.test{
    margin-bottom: 2px;
    width: 230px;
    border: 1px solid red;
}
.c1{}
.c2{ word-wrap:break-word;}
.c3{ word-wrap:break-word;word-break:break-all;}
.c4{ word-wrap:break-word;word-break:keep-all;}
.c5{ word-break:break-all;}
.c6{ word-break:keep-all;}
</style>

换行问题自古以来就是一个难题，写了几个例子，先来看看，没有耐心的可以直接<a href="#result">点这里</a>

### 定义

#### word-wrap

word-wrap 属性允许长单词或 URL 地址换行到下一行。

**语法**

```
word-wrap: normal | break-word;
```

|------------------+--------------------+
|    值            |  描述               |
|------------------|---------------------|
| normal           | 只在允许的断字点换行（浏览器保持默认处理）。 |
| break-word       | 在长单词或 URL 地址内部进行换行。|
|------------------+-------------------------------|

<!-- more -->

#### word-break

word-break 属性规定自动换行的处理方法。

**语法**

```
word-break: normal | break-all | keep-all;
```

|-----------------+---------------------------|
|       值        | 描述                       |
|-----------------|:---------------------------|
| normal          | 使用浏览器默认的换行规则。    |
| break-all       | 允许在单词内换行。           |
| keep-all        | 只能在半角空格或连字符处换行。     |
|-----------------+------------------------------|


### 开始测试

为了方便测试，先将`div`的`word-break`与`word-wrap`改成`normal`，
以下测试均为数字、字母、单词、汉字、汉字+单词混排在`div`中的表现情况


#### 默认无任何换行样式

```css
.c1 { 
    /* 无任何样式 */
}
```

<div class="test c1">11111111111111111111111111111111111111111111111111111</div>
<div class="test c1">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
<div class="test c1">This is all English. This is all English. This is all English. </div>
<div class="test c1">全是中文的情况。全是中文的情况。全是中文的情况。 </div>
<div class="test c1">中英文混排的情况。Chinese and English. 中英文混排的情况。Chinese and English. </div>

#### word-wrap: break-word

```css
.c2 {
    word-wrap: break-word;
}
```

<div class="test c2">111111111111111111111111111111111111111111111111111111111 </div>
<div class="test c2">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </div>
<div class="test c2">This is all English. This is all English. This is all English. </div>
<div class="test c2">全是中文的情况。全是中文的情况。全是中文的情况。</div>
<div class="test c2">中英文混排的情况。Chinese and English. 中英文混排的情况。Chinese and English. </div>

#### word-break: break-all;

```css
.c5 { 
    word-break: break-all;
}
```

<div class="test c5">111111111111111111111111111111111111111111111111111111111 </div>
<div class="test c5">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </div>
<div class="test c5">This is all English. This is all English. This is all English. </div>
<div class="test c5">全是中文的情况。全是中文的情况。全是中文的情况。</div>
<div class="test c5">中英文混排的情况。Chinese and English. 中英文混排的情况。Chinese and English. </div>

#### word-wrap: break-word; word-break: break-all;

```css
.c3 { 
    word-wrap: break-word;
    word-break: break-all;
}
```

<div class="test c3">111111111111111111111111111111111111111111111111111111111 </div>
<div class="test c3">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </div>
<div class="test c3">This is all English. This is all English. This is all English. </div>
<div class="test c3">全是中文的情况。全是中文的情况。全是中文的情况。</div>
<div class="test c3">中英文混排的情况。Chinese and English. 中英文混排的情况。Chinese and English. </div>

#### word-wrap: break-word; word-break: keep-all;

```css
.c4 { 
    word-wrap: break-word;
    word-break: keep-all;
}
```

<div class="test c4">111111111111111111111111111111111111111111111111111111111 </div>
<div class="test c4">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </div>
<div class="test c4">This is all English. This is all English. This is all English. </div>
<div class="test c4">全是中文的情况。全是中文的情况。全是中文的情况。</div>
<div class="test c4">中英文混排的情况。Chinese and English. 中英文混排的情况。Chinese and English. </div>

#### word-break: keep-all;

```css
.c6 { 
    word-break: keep-all;
}
```

<div class="test c6">111111111111111111111111111111111111111111111111111111111 </div>
<div class="test c6">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </div>
<div class="test c6">This is all English. This is all English. This is all English. </div>
<div class="test c6">全是中文的情况。全是中文的情况。全是中文的情况。</div>
<div class="test c6">中英文混排的情况。Chinese and English. 中英文混排的情况。Chinese and English. </div>


<h3><span id="result">结论</span></h3>

* word-wrap 强调的是是否允许单词内断句。
    * normal: 单词太长，换行显示，再超过一行就溢出显示。 
    * break-word: 当单词太长时，先尝试换行，换行后还是太长，单词内还可以换行。
* word-break 强调的则是怎么样来进行单词内的断句。 
    * break-all: 强行上，挤不下的话剩下的就换下一行显示呗。霸道型。 
    * keep-all: 放不下我了，那我就另起一行展示，再放不下，我也不退缩。傲骄型。

事实上，`word-wrap:break-word`与`word-break:break-all`共同点是都能把长单词强行断句，不同点是`word-wrap:break-word`会首先起一个新行来放置长单词，新的行还是放不下这个长单词则会对长单词进行强制断句；而`word-break:break-all`则不会把长单词放在一个新行里，当这一行放不下的时候就直接强制断句了。