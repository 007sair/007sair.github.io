---
layout: post
title: VSCODE 常用快捷键
description: VSCODE 常用快捷键
keywords: vscode
tags:
 - vscode
categories:
 - tool
---

> [官方版本](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

## vscode快捷键有5种组合方式

1. `Ctrl+Shift+?` 常规组合
2. `Ctrl+K F` 先组合后单键组合方式
3. `Ctrl+V Ctrl+V` 同时依赖一个按键的组合
4. `Alt+mouseClick` 按键+鼠标点击
5. `Alt+mouseDrag` 按键+鼠标拖拽

## 全局命令面板

`Ctrl+Shift+P/F1` 展示全局命令面板

## Ctrl+P 模式

在`Ctrl+P`下输入`>`又可以回到主命令框`Ctrl+Shift+P/F1`模式。

<!-- more -->

在`Ctrl+P`窗口下还可以

- 直接输入文件名，快速打开文件
- `?` 列出当前可执行的动作
- `!` 显示ERRORS或WARNINGS，也可以`Ctrl+Shift+M`
- `:` 跳转到行数，也可以`Ctrl+G`直接进入
- `@` 跳转到SYMBOL（搜索变量或者函数），也可以`Ctrl+Shift+O`直接进入
- `#` 根据名字查找SYMBOL，也可以`Ctrl+T`

## 编辑器 & 窗口

#### 打开多个窗口（多项目）

- 打开新编辑器窗口：`Ctrl+Shift+N`
- 打开终端 `Ctrl+~`
- 创建新的终端 `Ctrl+Shift+~`

#### 打开多个文件（多文件）

- 新建文件 `Ctrl+N`
- 打开的文件之间切换 `Ctrl+Tab`，`Alt+Left`，`Alt+Right`
- 切出一个新的编辑器（最多3个）`Ctrl+\`，也可以按住Ctrl鼠标点击EXPLORER里的文件名
- 左中右3个编辑器的快捷键 `Ctrl+1` `Ctrl+2` `Ctrl+3`
- 编辑器换位置 `Ctrl+K Left/Right`
- 切换标签页的位置 `Ctrl+Shift+PgUp/PgDown`
- 多窗口标签页移动 `Ctrl+Alt+Left/Right`

## 代码编辑

#### 格式调整

- 缩进 `Ctrl+[`，`Ctrl+]`
- 折叠/展开代码块 `Ctrl+Shift+[`，`Ctrl+Shift+]`
- 折叠/展开所有子区域代码 `Ctrl+k Ctrl+[`，`Ctrl+k Ctrl+]`
- 代码格式化 `Shift+Alt+F`，或`Ctrl+Shift+P`后输入`format code`
- 复制剪切一整行，不选中 `Ctrl+C/X`，`Ctrl+V`
- 上下移动一行：`Alt+Up/Down`
- 向上向下复制一行：`Shift+Alt+Up/Down`
- 在当前行下/行上边插入一行 `Ctrl+ENTER`/`Ctrl+Shift+ENTER`

## 光标相关

- 列选择 `Alt+Shifr+鼠标左键`
- 移动到行首 `Home`
- 移动到行尾 `End`
- 移动到文件结尾 `Ctrl+End`
- 移动到文件开头 `Ctrl+Home`
- 移动到后半个括号 `Ctrl+Shift+|`
- 选中当前行 `Ctrl+I`，多次按下选中向下内容
- 选择从光标到行尾 `Shift+End`
- 选择从行首到光标处 `Shift+Home`
- 删除光标所在行 `Ctrl+Delete`
- `shrink/expand selection`（光标所在单词，文档高亮显示相同的）：`Shift+Alt+Left`和`Shift+Alt+Right`
- `Multi-Cursor`：可以连续选择多处，然后一起修改，`Alt+Click`添加cursor
- 翻转IDE `Ctrl+Alt+Down` 或 `Ctrl+Alt+Up`
- 光标跳到多行选中文本末尾 `Ctrl+Shift+L`
- `Ctrl+D` 下一个匹配的也被选中(被我自定义成删除当前行了，见下边Ctrl+Shift+K)
- 回退上一个光标操作 `Ctrl+U`
- 行视图上下移动 `Ctrl+Up/Down`
- 屏视图上下移动 `Alt+Up/Down`

## 代码相关

- 跳转到定义处 `F12`
- 定义处缩略图：只看一眼而不跳转过去 `Alt+F12`
- 列出所有的引用 `Shift+F12`
- 同时修改本文件中所有匹配的 `Ctrl+F2`
- 批量重命名：比如要修改一个方法名，可以选中后按F2，输入新的名字，回车，会发现所有的文件都修改过了。
- 跳转到下一个Error或Warning：当有多个错误时可以按F8逐个跳转
- 比较文件，在左侧边栏里选择文件右键 `选择以进行比较`，然后需要对比的文件上右键选择`与xxx比较`。

## 查找替换

- 查找 `Ctrl+F`
- 查找替换 `Ctrl+H`
- 查询下一个/上一个 `F3/Shift+F3` 或 `Enter/Shift Enter`
- 选中所有出现在查询中的 `Alt + Enter`
- 整个文件夹中查找 `Ctrl+Shift+F` 匹配符：
- `*` to match one or more characters in a path segment
- `?` to match on one character in a path segment
- `**` to match any number of path segments ,including none
- `{}` to groUp conditions (e.g. {**/*.html,**/*.txt} matches all html and txt files)
- `[]` to declare a range of characters to match (e.g., example.[0-9] to match on example.0,example.1, …

## 显示相关

- 全屏 `F11`
- 缩放 `Ctrl + =` / `Ctrl + -`
- 侧边栏显/隐 `Ctrl+B`
- 侧边栏4大功能显示：
    - 打开资源 `Ctrl+Shift+E`
    - 打开搜索 `Ctrl+Shift+F`
    - 打开GIT `Ctrl+Shift+G`
    - 打开调试 `Ctrl+Shift+D`
    - 打开扩展 `Ctrl+Shift+X`
- 输出Show Output `Ctrl+Shift+U`
- 预览markDown `Ctrl+Shift+V`

## 其他

自动保存：`File -> AutoSave` ，或者`Ctrl+Shift+P`，输入 `auto`