---
title: Hexo-githubPage搭建个人博客.md
date: 2019-09-07 22:38:12
categories: Git
tags:
 - Hexo
 - 博客
---


这篇随笔记录了我搭建这个博客网站的过程。大家可以跟着一起做一个博客出来。：）

<!--more-->

## 一、安装 node.js 和 git

node 下载地址：[http://nodejs.cn/download/](http://nodejs.cn/download/)

Git 下载地址：[https://git-scm.com/downloads](https://git-scm.com/downloads)

（安装方法自行百度吧）

------

## 二、安装、配置 Hexo

Hexo 官网：[https://hexo.io/zh-cn/](https://hexo.io/zh-cn/)

- 安装 Hexo

  使用 npm 安装 Hexo，在 cmd 中输入：

  ```bash
  $ npm install hexo-cli -g
  ```

  ------

- 使用

  1. 创建一个 Blog 文件夹，然后在文件夹鼠标右键 Git Bash Here。在打开的命令行工具中输入：

     ```bash
     $ hexo init folder
     ```

     其中 **folder** 是创建的 **hexo** 的文件夹的名称，可以为空，如果为空的话，会默认以当前文件夹初始化。

     ------

  2. 进入新创建的文件夹：

     ```bash
     $ cd folder
     ```

     安装依赖文件：

     ```bash
     $ npm install
     ```

     之后生成静态文件：

     ```bash
     $ hexo g
     ```

     现在就可以看见效果了，启动服务;

     ```bash
     $ hexo s
     ```

     默认会以 4000 端口启动服务，如果想用其他端口，可以用下面代码：

     ```bash
     $ hexo -p 5000 server
     ```

     上面的代码就是以 5000 端口启动的服务，可以在浏览器中输入端口号看到我们的初始博客：[http://localhost:4000/](http://localhost:4000/)

------

## 三、设置 hexo 主题

- 现在的主题有点丑，我们可以换一个好看的主题，我用的是 Next 的主题，所以这里以 Next 的主题设置方式来举例：

  Next 主题官网：[http://theme-next.iissnan.com/](http://theme-next.iissnan.com/)

  1. 下载 Next 主题

     使用如下命令把主题下载到我们的 hexo 中：

     ```bash
     $ git clone https://github.com/iissnan/hexo-theme-next themes/next
     ```

     下载完成后我们可以在 根目录的 **themes** 文件夹下看到 **next** 文件夹，这个文件夹里面就是我们下载的主题。

     ------

  2. 更换主题

     在根目录下有一个 **_config.yml** 文件，我们先把它称作 <font color=red>站点配置文件</font>；

     在 **next** 文件夹下也有一个 **_config.yml** 文件，我们把它称作 <font color=red>主题配置文件</font>;

     <img src="https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rezg8q51j20ap0jogml.jpg" alt="1567860947900" style="zoom: 67%;" />

     我们在 <font color=red>站点配置文件</font> 中，找到 **theme** 字段，这个字段就是用来指定主题的，我们把它的值改为 **next**，这样我们就已经换好主题了。

     ![003.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf03aa1hj20g004iq35.jpg)     
     

------

## 四、站点配置

- 更换博客默认语言

  在 <font color=red>站点配置文件</font> 中，找到 **language** 属性，把它的属性值改为 **zh-Hans**，这样，我们的语言就已经设置成中文了。

  ------

- 设置站点信息

  在 <font color=red>站点配置文件</font> 中找到 **Site** 模块：

  ```
  title: 标题
  subtitle: 副标题
  description: 描述
  author: 作者
  language: 语言（简体中文是zh-Hans）
  timezone: 网站时区（Hexo 默认使用您电脑的时区，不用写）
  ```

  根据需要自己写就行了。

  ![004.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf0r20n3j20hf08kt97.jpg)

  ------

- 设置头像

  将你的头像放入项目根目录中的 **public** 文件夹下的 **images** 文件夹下，然后在  <font color=red>主题配置文件</font> 中找到 **avatar**，将 **url** 设置成 **/images/你图片的名称.格式**。这样头像就设置好了。

  ![005.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf126hixj20dx04vaaf.jpg)

  ------

- 更换 favicon.ico

  将你选择的 **favicon.ico** 图片也放入这个文件夹下，然后把 <font color=red>主题配置文件</font> 中的 **favicon** 属性的 **small** 和 **medium** 改为你放入的图片的路径。

  ![002.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf19klr0j20jg09z0u7.jpg)

------

## 五、启用菜单  

在  <font color=red>主题配置文件</font> 中，找到 **Menu Settings** 属性，它就是启用各项菜单项的：

![007.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf1fupiyj20fg08vwfb.jpg)

- 启用分类菜单

  在  <font color=red>主题配置文件</font> 中，找到 **Menu Settings**，将其属性 **menu** 里的 **categories** 启用。

  然后在 **Git Bash** 命令中新建一个分类页面：

  ```bash
  $ hexo new page categories
  ```

  可以看见 **source** 文件夹下面有了 **categories/index.md**，在 **index.md** 中加入：

  ```bash
  type: "categories"
  ```

  同时将 **title** 改为中文：

  ![008.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf1nj6o9j20dg05omxd.jpg)
  在写文章的时候，只要在顶部的标题下方添加 **categoried** 字段，就会自动创建分类名并放入对应的分类中：

  ![009.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf1w4xwxj20f705q3yp.jpg)

  ------

- 启用标签模块

  方法与上面相同，在  <font color=red>主题配置文件</font> 中，找到 **Menu Settings**，将其属性 **menu** 里的 **tags** 启用。

  然后在 **Git Bash** 命令中新建一个标签页面：

  ```bash
  $ hexo new page tags
  ```

  可以看见 **source** 文件夹下面有了 **tags/index.md**，在 **index.md** 中加入：

  ```bash
  type: "tags"
  ```

  同时将 **title** 改为中文：

  ![010.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf22opcij20b6057mx8.jpg)

  在写文章的时候，只要在顶部的标题下方添加 **tags** 字段，就会自动创建标签名并放入对应的标签中：

  ![011.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf29gtooj20fu05xdg2.jpg)

  需要注意的是，一篇文章的标签可以对应多个，但分类只能对应一个。

  ------

- 启用关于模块

  同样的，新建一个关于页面：

  ```bash
  $ hexo new page about
  ```

  **source** 文件夹下有了 **about/index.md**，在 **index.md** 中可以随意编辑。

  ![012.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf2go4kej20ax042glk.jpg)

------

## 六、添加插件功能

- 添加搜索功能

  安装插件：[hexo-generator-searchdb](https://github.com/theme-next/hexo-generator-searchdb) 

  ```bash
  $ npm install hexo-generator-searchdb --save
  ```

  在 <font color=red>站点配置文件</font> 中找到 **Extensions**，并添加：

  ```bash
  # 搜索
    search:
      path: search.xml
      field: post
      format: html
      limit: 10000
  ```

  在 <font color=red>主题配置文件</font> 中找到 **Local search**，将 **enable** 设置为 **true**：

  ![013.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf2ni51wj20k80950tp.jpg)

  ------

- 添加 RSS

  安装插件：[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) 

  ```bash
  $ npm install hexo-generator-feed --save
  ```

  在 <font color=red>站点配置文件</font> 中找到 **Extensions**，并添加：

  ```bash
  # RSS订阅
    feed:
      type: atom
      path: atom.xml
      limit: 20
      hub:
      content:
      content_limit: 140
      content_limit_delim: ' '
  ```

  在 <font color=red>主题配置文件</font> 中找到 **rss**，将 **rss** 设置为 **/atom.xml**：

  ![014.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf2xhiinj20j20520t3.jpg)

------

## 七、同步到 Github

- 在 Github 上新建一个仓库：

![015.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf37l059j20am0a3q3n.jpg)

![016.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf3f5razj20r40j8wg1.jpg)

	这里因为我已经创建了一个了，所以按钮是不可选。

------

- 配置 SSH key

  如果你没有配置过，在 **git bash** 中输入如下命令：

  ```bash
  $ ssh-keygen -t rsa -C "邮件地址"
  ```

  连续三次回车，它会告诉你一个文件目录，去目录里面找到 **.ssh\id_rsa.pub** 文件，用记事本打开并复制里面的内容，填入：

  ![017.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf3oj5faj207b0dx3yr.jpg)

  ![018.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf3xh4axj210m0g1758.jpg)

  

  在 **git bash** 中输入下面的命令测试是否成功：

  ```bash
  $ ssh -T git@github.com # 注意邮箱地址不用改
  ```

  如果提示 **Are you sure you want to continue connecting (yes/no)**，输入 **yes**，然后会看到：

  ```bash
  Hi liuxianan! You've successfully authenticated, but GitHub does not provide shell access.
  ```

  这个信息说明 SSH 配置成功了。

  最后的配置，命令行中输入：

  ```bash
  $ git config --global user.name "liuxianan"// 你的github用户名，非昵称
  $ git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
  ```

  ------

- 同步到 Github

  在 <font color=red>站点配置文件</font> 中找到 **deploy**，并修改：

  ![019.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf47oznjj20nn06j3z4.jpg)

  ![020.png](https://ws1.sinaimg.cn/mw690/d04ba6f6ly1g6rf4he6upj20co03xgln.jpg)

  要部署到 **Github**，我们需要安装一个插件：

  ```bash
  $ npm install hexo-deployer-git --save
  ```

  然后在 **git bash** 中使用下面的代码进行部署：

  ```bash
  $ hexo clean
  ```

  ```bash
  $ hexo g
  ```

  ```bash
  $ hexo d
  ```

------

## 完结

至此，博客就搭建好了，你也可以来尝试写自己的博客了。：）