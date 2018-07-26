## 分支

- `hexo`：数据分支，用于编辑更新博客，执行相关命令会将内容发布到`master分支`；
- `master`：展示分支，`hexo分支`发布的内容会展现在此分支。

## 日常操作

> 在`hexo分支`上写博客，文章会被发布到`master分支`。

``` bash
# 启动本地服务
$ hexo s -g

# 创建新文章
$ hexo new "页面名称"

# 发布博客
$ hexo d -g
```

## 创建博客

1. 创建仓库，仓库名：`007sair.github.io`，只有这种命名(`xxx.github.io`)的仓库才能是博客地址；
2. 创建两个分支：`master` 与 `hexo`；
3. 在`github账号`中设置`hexo`为默认分支，`Settings - Branches - Default branch`； 
4. 拷贝仓库`git@github.com:007sair/007sair.github.io.git`; 
5. 切换分支到`hexo`，在本地`007sair.github.io`目录下依次执行`npm install hexo`、`hexo init`、`npm install` 和 `npm install hexo-deployer-git`，注意有[坑](#keng); 
6. <span id="step6"></span>修改`_config.yml`中的`deploy`下的`branch: master`；
7. 依次执行`git add .`、`git commit -m "..."`、`git push origin hexo`提交网站相关的文件；
8. 执行`hexo d -g`生成网站并部署到`github`上。


## <span id="keng">踩坑</span>

第 `5` 步中特别要注意，`hexo init`会清空`.git` 文件夹（即版本控制信息会丢失） 

解决方法：先拷贝出`.git`文件夹，等第 `5` 步完成后，再粘贴`.git`文件进去。

## 配置[Git](https://git-scm.com/book/zh/v1/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)

让本地`Git项目`与`Github账户`建立联系，步骤如下：

``` bash
# 1. 设置Git的user name和email(如果是第一次的话)
$ git config --global user.name "your_name"
$ git config --global user.email "your_email@163.com"

# 2. 检查是否已经有SSH Key。
$ cd ~/.ssh  # Mac。 windows在 C:\Users\Administrator\.ssh 中查找
$ ls  # 查看是否存在 id_isa 和 id_isa.pub 文件

# 3. 如果步骤2没有文件
$ ssh-keygen -t rsa -C "your_email@163.com"

# 4. 添加SSH Key到GitHub
$ cat ~/.ssh/id_rsa.pub
# 打开Github，点击右上角头像，依次打开`Settings — SSH and GPG keys — New SSH key`
# 将上面命令显示的内容复制到key文本框中，点击`add key`即可。

# 5. 测试
$ ssh -T git@github.com
# 成功将会看到：
# Hi 007sair! You've successfully authenticated, but GitHub does not provide shell access.
```
