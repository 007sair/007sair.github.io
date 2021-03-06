---
layout: post
title: css选择器总结
description: css选择器的使用与兼容情况
keywords: css css3 selectors id attr
tags:
 - css
 - css选择器
categories:
 - css
---

<style>
td{font-family: Verdana, Geneva, sans-serif;font-size: 13px;}
</style>

> 约定：IE7+ 意思为大于（含IE7）的浏览器

## CSS1 & CSS2.1 选择器

### 基础选择器

选择器        |       例子             |         例子描述                             |   兼容性   
------------------|-----------------------|---------------------------------------------|----------
 *                |             *         |       选择所有元素。                          |    all   
 E                |             p         |      选择所有 `<p>` 元素。                      |    all   
 #id              |        #firstname     |  选择 `id="firstname"` 的所有元素。             |    all   
 .class           |        .intro         |  选择 `class="intro"` 的所有元素。              |    all   

<!-- more -->

### 组合选择器

选择器        |       例子             |         例子描述                             |   兼容性   
------------------|---------------------|---------------------------------------------|------------
 E,F              |        div,p          |   选择所有 `<div>` 元素和所有 `<p>` 元素。         |    all     
 E F              |        div p          |   选择 `<div>` 元素内部的所有 `<p>` 元素。         |   all      
 E > F            |        div>p          |   选择父元素为 `<div>` 元素的所有 `<p>` 元素。     |    IE7+    
 E + F            |        div+p          |   选择紧接在 `<div>` 元素之后的所有 `<p>` 元素。   |    IE7+    

### 属性选择器

选择器             |       例子            |         例子描述                             |   兼容性  
------------------|-----------------------|---------------------------------------------|-----------
 `E[att]`         |      `[target]`       |   选择带有 `target` 属性所有元素。               |    IE7+    
 `E[att=val]`     |   `[target=_blank]`  |   选择 `target="_blank"` 的所有元素。          |   IE7+     
 `E[att~=val]`    |   `[title~=flower]`   |   选择 `title` 属性包含单词 `"flower"` 的所有元素。 |    IE7+   
 `E[att=val]`    |    `[lang=en]`       |   选择 `lang` 属性值以 `"en"` 开头的所有元素。     |    IE7+   

### 伪元素

选择器        |       例子             |         例子描述                             |   兼容性  
------------------|-----------------------|--------------------------------------------|-----------
 E:first-line     |    p:first-line        |   选择每个 `<p>` 元素的首行。                   |    IE7+   
 E:first-letter   |    p:first-letter      |    选择每个 `<p>` 元素的首字母。                |    IE7+   
 E:before         |    p:before            |   在每个 `<p>` 元素的内容之前插入内容。          |    IE8+   
 E:after          |    p:after             |   在每个 `<p>` 元素的内容之后插入内容。          |    IE8+   

### 伪类

选择器        |       例子             |         例子描述                             |   兼容性   
------------------|-----------------------|---------------------------------------------|------------
 E:first-child    |    p:first-child      |  选择属于父元素的第一个子元素的每个 `<p>` 元素。  |    IE7+    
 E:link           |    a:link             |    选择所有未被访问的链接。                    |    all    
 E:visited        |    a:visited          |   选择所有已被访问的链接。                     |    all    
 E:active         |   a:active            |   选择活动链接。                              |    all    
 E:hover          |   a:hover             |   选择鼠标指针位于其上的链接。                  |   IE6+(?)    
 E:focus          |   input:focu          |   选择获得焦点的 input 元素。                 |    IE8+    
 E:lang(c)        |   p:lang(it)          |  选择带有以 "it" 开头的 lang 属性值的每个 `<p>` 元素。 |    IE7+    

**CSS 2.1 selectors Known issues (6):**

- IE6 does not properly support combinations of pseudo classes like `:link`, `:active` and `:visited`
- IE8-11 does not update an element's :hover status when scrolling without moving the pointer.
- Safari 5.1 and Android browsers do not support the adjacent selector if the adjacent element is a "nav" element.
- :first-child fails in IE7 if the first child is a comment.
- IE7 doesn't support all pseudo classes (like :focus) or pseudo elements (like :before and :after)
- In IE10 adjacent sibling selector doesn't work with pseudo-class in case of `E:active F`.

## CSS3选择器

### 同级元素通用选择器

选择器        |       例子        |         例子描述                             |   兼容性   
-------------|-------------------|--------------------------------------------|------------
 E ~ F       |    p~ul           |   选择前面有 `<p>` 元素的每个 `<ul>` 元素。    |    IE7+    

### 属性选择器

选择器        |       例子             |         例子描述                                   |   兼容性   
------------------|-----------------------|--------------------------------------------------|--------
 `E[att^="val"]`    |  `a[src^="https"]`      |  选择其 `src` 属性值以 `"https"` 开头的每个 `<a>` 元素。  |    IE7+    
 `E[att$="val"]`    |  `a[src$=".pdf"]`       |  选择其 `src` 属性以 `".pdf"` 结尾的所有 `<a>` 元素。     |    IE7+    
 `E[att*="val"]`    |  `a[src*="abc"]`        |  选择其 `src` 属性中包含 `"abc"` 子串的每个 `<a>` 元素。  |    IE7+    

### 与用户界面有关的伪类

|    选择器         |       例子             |         例子描述                     |   兼容性   |
|------------------|-----------------------|-------------------------------------|------------|
| `E:enabled`      |    `input:enabled`    |   选择每个启用的 `<input>` 元素。       |    IE9+    |
| `E:disabled`     |    `input:disabled`   |   选择每个禁用的 `<input>` 元素         |    IE9+   |
| `E:checked`      |    `input:checked`    |    选择每个被选中的 `<input>` 元素。    |    IE9+    |
| `E::selection`   |    `::selection`      |   选择被用户选取的元素部分。             |    IE9+   |

### 结构性伪类

选择器                   |       例子                 |         例子描述                             |   兼容性  
------------------------|---------------------------|---------------------------------------------|-----------
 `E:root`               |  `:root`                  | 选择文档的根元素。                             |    IE9+   
 `E:nth-child(n)`       |  `p:nth-child(2)`         | 选择属于其父元素的第二个子元素的每个 `<p>` 元素。  |    IE9+   
 `E:nth-last-child(n)`  |  `p:nth-last-child(2)`    | 同上，从最后一个子元素开始计数。                |    IE9+   
 `E:nth-of-type(n)`     |  `p:nth-of-type(2)`       | 选择属于其父元素第二个 `<p>` 元素的每个 `<p>` 元素。 |    IE9+   
 `E:nth-last-of-type(n)`|  `p:nth-last-of-type(2)`  | 同上，但是从最后一个子元素开始计数。             |    IE9+   
 `E:last-child`         |  `p:last-child`           | 选择属于其父元素最后一个子元素每个 `<p>` 元素。    |    IE9+   
 `E:first-of-type`      |  `p:first-of-type`        | 选择属于其父元素的首个 `<p>` 元素的每个 `<p>` 元素。 |    IE9+   
 `E:last-of-type`       |  `p:last-of-type`         | 选择属于其父元素的最后 `<p>` 元素的每个 `<p>` 元素。 |    IE9+   
 `E:only-child`         |  `p:only-child`           | 选择属于其父元素的唯一子元素的每个 `<p>` 元素。    |    IE9+   
 `E:only-of-type`       |  `p:only-of-type`         | 选择属于其父元素唯一的 `<p>` 元素的每个 `<p>` 元素。 |    IE9+   
 `E:empty`              |  `p:empty`                | 选择没有子元素的每个 `<p>` 元素（包括文本节点）。  |    IE9+   

### 其他伪类

|    选择器         |       例子           |         例子描述                   |   兼容性   |
|------------------|---------------------|-----------------------------------|------------|
| `E:not(s)`       |   `:not(p)`         |   选择非 `<p>` 元素的每个元素。      |    IE9+    |
| `E:target`       |   `#news:target`    |   选择当前活动的 `#news` 元素。      |    IE9+    |


**CSS 3 selectors Known issues (4):**

- iOS 9 has a bug in WebViews (not Safari) with the CSS sibling selector
- IE9-IE11 supports `:empty` but will not repaint/relayout the page if content is added/removed from an `:empty` selected element
- iOS 8 Safari has issues with nth-child. 
- Android 4.3 and lower (together with older WebKit browsers) have issues when combining pseudo classes with adjacent or general sibling selectors.


## 结论：

- css1少数选择器不支持ie6，其他全支持
- css2.1不支持ie6
- css3不支持ie6，少数在ie7 8上也不支持

**参考：**

- [CSS 选择器参考手册](http://www.w3school.com.cn/cssref/css_selectors.asp)
- [Can i use](http://caniuse.com/#search=css%20sel)
- [CSS选择器的浏览器支持](https://labs.qianduan.net/css-selector/)