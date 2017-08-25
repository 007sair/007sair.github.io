---
layout: post
title: sublime常用插件
description: sublime常用插件
tags:
 - sublime
 - tool
categories:
 - tool
---

> 收集一些常用的sublime插件，具体使用方式请到 <a href="https://packagecontrol.io/" target="_blank" title="">Package Control</a> 自行查找。

## 常用插件

**SublimeCodeIntel**  
    代码自动提示，若报错可<a href="http://blog.csdn.net/shuifa2008/article/details/9340011" target="_blank" title="">关闭错误提示</a>

<!-- more -->

**jQuery**     
    jq代码自动补全，tab触发格式自行查阅此插件包的snippets文件。

**SCSS**  
    scss代码颜色高亮，安装后在sublime右下角选择scss

**KeymapManager**     
    Ctrl+Alt+K     查看快捷键冲突

**DocBlockr**     
    自动补全注释，使用方法：`/**` -> `Tab`

**AutoFileName**     
    文件路径自动提示，已知会影响下拉提示（装此插件后，已自定义的函数不提示了）

**Alignment**     
    等号对齐，在Preferences -> package settings -> Alignment -> Settings User添加冒号对齐。
    
```json
{
     "align_indent": false,
     "alignment_chars": ["=", ":"],
     "alignment_space_chars": ["=", ":"]
}
```

**Clipboard History**     
    保存复制粘贴历史记录

    Press ctrl-alt-v to show the history.
    Press ctrl-alt-d to clear the history.
    Press ctrl-shift-v to paste the previous (older) history entry.
    Press ctrl-shift-alt-v to paste the next (newer) history entry.

**Placeholders**     
    占位符     使用方法见此文件夹的snippet

**cssCommentsSnippets**     
    css添加注释预置

**jsConsole**     
    js控制台自动提示

**CSS-Format**     
    css格式化     Edit -> css Format

**SassBeautify**     
    sass格式化     Ctrl+Shift+P -> sassbeautify

**Autoprefixer**     
    Ctrl+Alt+Shift+P     自动增加前缀 ，依赖 <a href="https://nodejs.org/" target="_blank" title="">nodejs</a>
    
```json
//browserslist
{
    "browsers": ["last 1 version", "> 10%", "> 5% in US", "ie 8", "ie 7"]
}
[
    { "keys": ["alt+ctrl+shift+p"], "command": "autoprefixer" }
]
```

**MarkdownEditing**     
    模板工具，将Markdown.sublime-settings中的`color_scheme` 替换 “设置-用户”中的color_scheme


## JS模板插件

**javaScriptSnippets**     
    自动补全js代码，下拉提示及触发格式自行查阅插件包内的snippet

**jQuerySnippets**     
    自动补全jq代码，下拉提示及触发格式自行查阅插件包内的snippet

**insertCallback**     
    Alt+C     自动补全callback函数     使用tab依次切换编辑文本块


## JS插件

**AdvancedNewFile**     
    Ctrl+Alt+N     快速创建文件

**Http Requester**     
    Ctrl+Alt+R     使用此快捷需先选中注释的测试地址

**SublimeLinter-jshint**     
    js校验    依赖：SublimeLinter

**NodeJS**     
    需安装npm包，cmd命令：npm install -g jshint     (jshint版本需>2.4) <br>
    需创建配置文件.jshintrc,文件为json格式，具体配置见：http://jshint.com/docs/options/
