---
layout: post
title: sublime常用快捷键
description: sublime常用快捷键
tags:
 - sublime
 - tool
categories:
 - tool
---

**常用快捷键**

ctrl+p    查找当前项目中的文件和快速搜索，功能如下：

* 切换文档（goToAnything：需先添加项目至左侧sidebar），不单单是在当前打开的文档中切换，包括整个project，并可用关键字过滤；
* 关键字@开头，匹配的是文档中的函数及其他关键内容（如：HTML匹配的元素id，CSS匹配的选择器）；
* 关键字#开头，全文搜索；
* 关键字：开头，后跟数字可跳转至相应的行，快捷键为ctrl+g

<!-- more -->

    ctrl+l           选择整行(按住-继续选择下行)
    ctrl+g           跳转到相应的行
    ctrl+j           合并行(已选择需要合并的多行时)
    ctrl+m           光标移动至括号内开始或结束的位置
    ctrl+/           注释整行(如已选择内容，同“ctrl+shift+/”效果)
    ctrl+z           撤销
    ctrl+y           恢复撤销
    ctrl+t           词互换（先选中要互换的两对词）
    ctrl+d           删除当前行
    ctrl+n           新建文件
    ctrl+s           保存文件
    ctrl+k/b         显示隐藏左侧边栏
    ctrl+x           剪切整行 

    ctrl+kk          从光标处删除至行尾
    ctrl+ku          改为大写
    ctrl+kl          改为小写
    ctrl+kt          折叠属性
    ctrl+k0          展开所有(k+零)

    ctrl+enter           插入行后
    ctrl+shift+enter     插入行前
    ctrl+k+backspace     从光标处删除至行首
    ctrl+kk              从光标处删除至行尾

    ctrl+shift+a        选择光标位置父标签对儿
    ctrl+shift+d        复制光标所在整行，插入在该行之前
    ctrl+shift+f        在文件夹内查找，与普通编辑器不同的地方是sublime允许添加多个文件夹进行查找
    ctrl+shift+m        选择括号内的内容(按住-继续选择父括号)
    ctrl+shift+↑        与上行互换
    ctrl+shift+↓        与下行互换
    ctrl+shift+s        另存为
    ctrl+shift+[        折叠代码（在html中配合ctrl+shift+t有奇效）
    ctrl+shift+]        不折叠

    ctrl+shift+t   
        *  鼠标在HTML内时，选中当前层级的所有元素 
        *  鼠标在其他文件中时，重新打开最近关闭文件

    ctrl+鼠标左键        可以同时选择要编辑的多处文本 
    shift+鼠标右键       可以用鼠标进行竖向多行选择，功能同鼠标中建

    ctrl+F2             设置/取消书签
    shift+F2            上一个书签
    F2                  下一个书签
    F11                 全屏状态
    shift+F11           免打扰模式

    alt+.               闭合当前标签 
    alt+shift+1         （非小键盘）窗口分屏，恢复默认1屏
    alt+shift+2         左右分屏-2列
    alt+shift+3         左右分屏-3列
    alt+shift+4         左右分屏-4列
    alt+shift+5         等分4屏
    alt+shift+8         垂直分屏-2屏
    alt+shift+9         垂直分屏-3屏
    alt+F3              选中文本按下此快捷键，即可一次性选择全部的相同文本进行同时编辑


**插件：sublime Tmpl**

    * ctrl+alt+h        创建html文件
    * ctrl+alt+j        创建js文件
    * ctrl+alt+c        创建css文件
    * ctrl+alt+p        创建php文件
    * ctrl+alt+shift+p  创建pythone文件
    * ctrl+alt+r        创建ruby文件


**插件：Markdown**

    * alt+m         在浏览器上查看当前md文档
    * ctrl+b        为该md文档创建html页面




