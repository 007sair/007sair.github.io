# 007sair.github.io
my blog：http://007sair.github.io

## 简明流程

在`hexo`分支上写博客，执行命令，有了步骤 `6` 后会自动将博客内容生成到`master`分支

## 具体步骤：

1. 创建仓库：`007sair.github.io`；
2. 创建两个分支：`master` 与 `hexo`；
3. 设置`hexo`为默认分支（Settings -> Branches -> Default branch）； 
4. 使用`git clone git@github.com:strivebo/007sair.github.io.git`拷贝仓库； 
5. 保证当前分支为`hexo`，在本地`007sair.github.io`文件夹下通过`Git bash`依次执行`npm install hexo`、`hexo init`、`npm install` 和 `npm install hexo-deployer-git`; 
6. 修改`_config.yml`中的`deploy`参数，分支应为`master`；
7. 依次执行`git add .`、`git commit -m "..."`、`git push origin hexo`提交网站相关的文件；
8. 执行`hexo d -g`生成网站并部署到GitHub上。

## 坑

第 `5` 步中特别要注意，`hexo init`会清空`.git` 文件夹（即版本控制信息会丢失） 

解决：先拷贝出`.git`文件夹，等第 `5` 步完成后，再粘贴`.git`文件进去。

