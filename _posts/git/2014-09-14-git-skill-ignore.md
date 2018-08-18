---
title: Git高级技巧之忽略文件
layout: post
category: git
---

# Git高级技巧之忽略文件

## 前言

前段时间新参与公司的一个项目，由于服务器 ruby 版本管理用的是 rvm，我在本地用的是 rbenv，这两个 ruby 版本管理软件都用到了`.ruby-version`作为配置文件，但是语法不一样。
我的需求是在本地改动`.ruby-version`这个文件，但是让 git 忽略我在本地的改动。
首先我想到的是使用`.gitignore`配置文件，但是使用`.gitignore`会将`.ruby-version`这个文件删除，这显然不是我想要的结果。
那怎么解决这个问题呢？

## git 忽略文件的两个类型

git 忽略文件的类型分为：临时忽略，永久忽略两个类型。`.gitignore`实际是属于永久忽略一个文件。

### git 临时忽略文件
命令：`git update-index --assume-unchanged <file>`

我先在项目下运行 git status，结果是这样的：

```bash
On branch master
Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .ruby-version

no changes added to commit (use "git add" and/or "git commit -a")
```

然后我运行命令：`git update-index --assume-unchanged .ruby-version`

改动果然被忽略了：

```bash
On branch master
Your branch is up-to-date with 'origin/master'.

nothing to commit, working directory clean
```

但是我还是有个疑问，我怎么知道我将哪些文件临时忽略了呢？

命令：`git ls-files -v`

结果如下：

```bash
...
H .gitignore
h .ruby-version
H 404.html
...
```

要知道`git ls-files -v`这个命令的结果含义，首先需要了解`git ls-files -t`，这个命令会列出各个文件的状态。

文件前面那个字母标志的含义如下：
- H  cached
- S  skip-worktree
- M  unmerged
- R  removed/deleted
- C  modified/changed
- K  to be killed
- ?  other

`git ls-files -v`是`-t`的升级版，对应小写字母则表示这个文件是否被临时忽略。

有结就有解，继续跟踪的命令是：`git update-index --no-assume-unchanged <file>`

### 永久忽略

永久忽略一般大家都知道，主要就是`.gitignore`的配置，这个配置分为三个级别：
#### 项目中的`.gitignore`文件
这个是放在版本库里共享的；
#### 项目中`.git`目录下地`info/exclude`文件
这个是本地针对该项目忽略的，比如我 ruby 的项目用的编辑器会生成一个`.idea`的文件夹，就在这里配置忽略；
#### 全局配置
需要在`.gitconfig`文件中指定一个全局的配置文件路径，如：

```
[core]
	excludesfile = /Users/qin/.gitignore
```
比如 mac 电脑会生成一个`.DS_Store`的文件，就适合在这里配置，对所有项目生效。
