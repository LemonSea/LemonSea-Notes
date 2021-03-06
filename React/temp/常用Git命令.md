---
title: 常用的 Git 命令.md
date: 2019-09-09 00:12:31
categories: Git
tags:
 - Git
---

这里主要介绍的是 Git 的常用命令
<!--more-->

## 初始化 git

```bash
$ git init
```

## 项目关联

```bash
$ git remote add origin 项目对应的SSH
```

## 查看本地分支

```bash
$ git branch
```

## 删除本地分支

```bash
$ git branch -d [本地分支名称]
```

## 查看远程分支

```bash
$ git branch -r
```

## 删除远程分支

```bash
$ git push origin --delete [远程分支名称]
```

## 查看所有分支

```bash
$ git branch -a
```

## 查看远程仓库

```bash
$ git remote -v
```

## 克隆远程仓库

```bash
$ git clone 远程的地址
```

## 查看当前本地仓库的状态

```bash
$ git status
```

## 把当前所作的更改提交到本地仓库

```bash
$ git add .
```

或者

```bash
$ git add [name]
```

## 提交仓库里面的内容

```bash
$ git commit -m "注释"
```

注释是必须要写的

## 同步到 Github

```bash
$ git push origin master
```

这里我是同步到的 `master` 分支。

## 回退

```bash
$ git reset --hard HEAD^
```

值得注意的是，这个命令回退的是最后一次提交的，如果可以的话，最好使用回退到指定版本。

回退到指定版本只需讲 `HEAD^` 更改为对应的提交记录号就可以了。

## 创建并切换到当前分支

```bash
$ git checkout -b 分支名称
```

## 查看提交记录

```bash
$ git log
```

查看完成后可以使用 `:q` 退出。

## 将本地的新分支推送到远程

```bash
$ git push origin 远程分支名:本地分支名
```

两个（远程、本地）分支名要相同。

## 合并本地分支

如果现在是在 `分支2` 上面，且 `分支2` 上有新内容，要把新内容合并到旧的 `分支1`，先切换回 `分支1`，然后执行下面的语句：

```bash
$ git merge 分支2
```

现在就把 `分支2` 的内容合并到了 `分支1`，然后推送 `分支1` 就可以了：

```bash
$ git push origin 分支1
```

---

## 总结：多开分支