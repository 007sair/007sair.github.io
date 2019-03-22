---
title: Hammerspoon多屏焦点切换
date: 2019-02-28 10:14:55
tags:
  - Mac
  - Hammerspoon
categories:
  - tool
---

最近为 mac 新弄了一个 4k 的外接屏，由于平时操作仅限于触控板，无鼠标人士。每次想把鼠标切换到外接屏上就得滑好几次触控板，甚是伤手！

通过不断的 google，终于发现一款神器：Hammerspoon

<!-- more -->

### 介绍

`Hammerspoon`可以自定义`Mac OS X`的快捷键（例如`Command+Shift+h`）以实现多类操作，我个人主要将其用于窗口管理（比`moom for mac`更加高效）与应用启动（比`alfred for mac`更加高效）。

- Hammerspoon: https://www.hammerspoon.org/
- Github: https://github.com/Hammerspoon/hammerspoon
- Hammerspoon API Documentation: https://www.hammerspoon.org/docs/index.html

这款软件可以让你通过写`lua`脚本来调用`Mac`的`Api`，自定义系统操作。可以实现：

- 窗口复杂的移动，可以指定移动的坐标
- 窗口大小调整
- 多窗口排列
- 监控响应多种事件
- 鼠标控制

等骚操作。

### 安装

- 下载[安装包](https://github.com/Hammerspoon/hammerspoon/releases/)，并将`Hammerspoon.app`从下载处拖拽到`Applications`中；

- 通过[Homebrew](https://brew.sh/)工具安装。

  ```bash
  # 命令
  $ brew cask install hammerspoon
  ```

### 使用

```bash
# 进入`.hammerspoon`目录
$ cd ~/.hammerspoon
# 创建`init.lua`，有这个文件就忽略这步
$ touch init.lua
```

之后就是往`init.lua`中添加配置，修改完配置后`hammerspoon.app`需要重新加载(`Menu -> hammerspoon.app -> Reload Config`)；

为方便模块化设计，将整个目录构建成如下结构：

```bash
├── init.lua
└── modules
    ├── hotkey.lua
    └── windows.lua
```

为节省时间，各文件使用开源已有的代码，如下：

**init.lua**

```lua
require "modules/hotkey" -- hotkey.lua
require "modules/windows" -- windows.lua
```

**hotkey.lua**

[链接](https://github.com/007sair/hammerspoon/blob/master/modules/hotkey.lua)

**windows.lua**

[链接](https://github.com/007sair/hammerspoon/blob/master/modules/windows.lua)

### 快捷键

##### 移动光标

- <kbd>⌃</kbd><kbd>⌥</kbd> + <kbd>←</kbd> 把光标移动到下一个显示器
- <kbd>⌃</kbd><kbd>⌥</kbd> + <kbd>→</kbd> 把光标移动到上一个显示器

##### 移动窗口

- <kbd>⇧</kbd><kbd>⌥</kbd> + <kbd>←</kbd> 将当前活动窗口移动到上一个显示器
- <kbd>⇧</kbd><kbd>⌥</kbd> + <kbd>→</kbd> 将当前活动窗口移动到下一个显示器
- <kbd>⇧</kbd><kbd>⌥</kbd> + <kbd>1</kbd> 将当前活动窗口移动到第一个显示器并窗口最大化
- <kbd>⇧</kbd><kbd>⌥</kbd> + <kbd>2</kbd> 将当前活动窗口移动到第二个显示器并窗口最大化

[其他快捷键](https://github.com/007sair/hammerspoon/blob/master/README_zh-CN.md)

### 参考

- [HammerSpoon - 不止是窗口管理](https://www.jianshu.com/p/e9d0e82d901d)
- [Mac osx 让工作更有效率的桌面控制管理工具](https://xiking.win/2018/07/18/desktop-automation-tools-for-mac/)
- [Mac 神器 hammerspoon](https://seanxp.com/2016/05/mac-hammerspoon/)

### 进阶

- [其他配置 - Github](https://github.com/S1ngS1ng/HammerSpoon/blob/master/README-cn.md)
- [使用 Hammerspoon 自动化工作流](https://liuhao.im/chinese/2017/06/02/%E4%BD%BF%E7%94%A8Hammerspoon%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B7%A5%E4%BD%9C%E6%B5%81.html)
- [闲话 macOS 二：窗口管理之 Hammerspoon](https://jeoygin.org/2017/12/10/customize-macOS-2/)
