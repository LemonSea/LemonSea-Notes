---
title: 常用的 Git 命令.md
date: 2019-09-09 00:12:31
categories: Git
tags:
 - Git
---

这里主要介绍的是 Git 的常用命令
<!--more-->

# 1. Git 常用命令

## 1.1 初始化 git

```bash
$ git init
```

## 1.2 项目关联

```bash
$ git remote add origin 项目对应的SSH
```

## 1.3 查看分支

### 1.3.1 查看本地分支

```bash
$ git branch
```

### 1.3.2 查看远程分支

```bash
$ git branch -r
```

### 1.3.3 查看所有分支

```bash
$ git branch -a
```

## 1.4 删除分支

### 1.4.1 删除本地分支

```bash
$ git branch -d [本地分支名称]
```

### 1.4.2 删除远程分支

```bash
$ git push origin --delete [远程分支名称]
```

## 1.5 拉取远程分支

## 1.5.1 拉取并放到新分支

创建本地分支，该分支复制于对应的远程分支

```shell
$ git checkout -b <本地分支名> origin/<远程分支名>
```

### 1.5.2 拉取并放到当前分支

```shell
$ git pull origin 远程分支　
```

### 1.5.3 拉取远程分支并比较

```shell
$ git fetch origin <远程分支名>:<本地分支名>
```

该方法常用于比较，eg：

```shell
$ git fetch origin master:tmp
$ git diff tmp 
$ git merge tmp
```

## 1.6 创建并切换到当前分支

```bash
$ git checkout -b 分支名称
```

## 1.7 将本地的新分支推送到远程

```bash
$ git push origin 远程分支名:本地分支名
```

两个（远程、本地）分支名要相同。

## 1.8 合并本地分支

如果现在是在 `分支2` 上面，且 `分支2` 上有新内容，要把新内容合并到旧的 `分支1`，先切换回 `分支1`，然后执行下面的语句：

```bash
$ git merge 分支2
```

现在就把 `分支2` 的内容合并到了 `分支1`，然后推送 `分支1` 就可以了：

```bash
$ git push origin 分支1
```

## 1.9 管理仓库

### 1.9.1 查看远程仓库

```bash
$ git remote -v
```

### 1.9.2 克隆远程仓库

```bash
$ git clone 远程的地址
```

### 1.9.3 查看当前本地仓库的状态

```bash
$ git status
```

### 1.9.4 把当前所作的更改提交到本地仓库

```bash
$ git add .
```

或者

```bash
$ git add [name]
```

### 1.9.5 提交仓库里面的内容

```bash
$ git commit -m "注释"
```

注释是必须要写的

### 1.9.6 同步到 Github

```bash
$ git push origin master
```

这里我是同步到的 `master` 分支。

## 1.10 获取远程分支最新内容到本地

### 1.10.1 拉起远程分支到本地

```shell
$ git fetch origin <远程分支名(master)>:<本地分支名(temp)>
```

本地新建一个分支(temp)，并将远程仓库的指定分支(master)的代码下载到本地该分支(temp)上面。

### 1.10.2 比较拉取的分支与本地仓库的区别

```shell
 $ git diff <新分支名(temp)>
```

### 1.10.3 合并新分支到本地

```shell
$ git merge <新分支名(temp)>
```

### 1.10.4 删除新分支

```shell
$ git branch -d <新分支名(temp)>
```

## 1.11 回退

```bash
$ git reset --hard HEAD^
```

值得注意的是，这个命令回退的是最后一次提交的，如果可以的话，最好使用回退到指定版本。

回退到指定版本只需讲 `HEAD^` 更改为对应的提交记录号就可以了。

## 1.12 查看日志

```bash
$ git log
```

查看完成后可以使用 `:q` 退出。

# 2. 总结：多开分支

# 3. 创建 SSH KEY

```bash
$ ssh-keygen -t rsa -C "2533566560@qq.com"
```

这里填注册 GitHub 的邮箱。

去 GitHub 中的 settings 的 SSH and GPG keys，点击 `add SSH Key`，把 `C:\Users\Administrator\.ssh\id_rsa.pub` 里面的内容粘贴到 key 里面，title 随便写。

验证是否成功：

```bash
$ ssh -T git@github.com
```

出现：

```bash
Hi LemonSea! You've successfully authenticated, but GitHub does not provide shell access.
```

说明成功，设置 username 和 email：

```bash
$ git config --global user.name  "name"//你的GitHub登陆名
$ git config --global user.email "123@126.com"//你的GitHub注册邮箱
```

20/01/08 的状态：

```bash
$ git config --global user.name "LemonSea"
$ git config --global user.email "2533566560@qq.com"
```



## Ping Github 提示请求超时

在 `C:\Windows\System32\drivers\etc` 目录下找到 `hosts` 文件，用管理员身份打开记事本或其他能修改这个文件的软件，在其末尾添加

> 192.30.253.113    github.com
> 192.30.252.131 github.com
> 185.31.16.185 github.global.ssl.fastly.net
> 74.125.237.1 dl-ssl.google.com
> 173.194.127.200 groups.google.com
> 192.30.252.131 github.com
> 185.31.16.185 github.global.ssl.fastly.net
> 74.125.128.95 ajax.googleapis.com

这是用来做 DNS 解析的，现在再 ping github.com 就可以 ping 通了。

## 结束命令

q + enter