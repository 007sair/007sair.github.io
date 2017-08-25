# 007sair.github.io
my blog：http://007sair.github.io

## 日常修改

在`hexo`分支上写博客，执行命令，有了步骤 `6` 后会自动将博客内容生成到`master`分支

## 创建博客：

1. 创建仓库，仓库名：`007sair.github.io`（只有这个名字的仓库才能是博客地址）；
2. 创建两个分支：`master` 与 `hexo`；
3. 设置`hexo`为默认分支（Settings -> Branches -> Default branch）； 
4. 使用`git clone git@github.com:007sair/007sair.github.io.git`拷贝仓库； 
5. 保证当前分支为`hexo`，在本地`007sair.github.io`文件夹下通过`Git bash`依次执行`npm install hexo`、`hexo init`、`npm install` 和 `npm install hexo-deployer-git`; 
6. 修改`_config.yml`中的`deploy`参数，分支应为`master`；
7. 依次执行`git add .`、`git commit -m "..."`、`git push origin hexo`提交网站相关的文件；
8. 执行`hexo d -g`生成网站并部署到GitHub上。

## 坑

第 `5` 步中特别要注意，`hexo init`会清空`.git` 文件夹（即版本控制信息会丢失） 

解决：先拷贝出`.git`文件夹，等第 `5` 步完成后，再粘贴`.git`文件进去。

## 配置ssh keys

目的：让本地git项目与github建立联系

#### 生成新的SSH Key：

``` bash
$ ssh-keygen -t rsa -C "邮件地址@youremail.com"
```

#### 添加SSH Key到GitHub

在本机设置SSH Key之后，需要添加到GitHub上，以完成SSH链接的设置。

1. 打开本地`C:\Users\user\.ssh\id_rsa.pub`文件。此文件里面内容为刚才生成人密钥。如果看不到这个文件，你需要设置显示隐藏文件。准确的复制这个文件的内容，才能保证设置的成功；
2. 登陆`Github`,点击右上角的头像`Settings —> SSH and GPG keys —> New SSH key`；      
3. 把你本地生成的密钥复制到里面（key文本框中）， 点击 `add key` 就ok了。

#### 设置git身份信息

``` bash
$ git config --global user.name "你的用户名"
$ git config --global user.email "你的邮箱"
```