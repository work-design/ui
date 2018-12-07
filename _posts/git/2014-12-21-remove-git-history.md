---
title: 如何移除某次提交之前的版本历史
category: git
layout: post
---

### step-1：查看相关提交的包含队形

命令： `git log --pretty=raw`  查看详细的log信息

```
commit 517e681c92d0055cc14147a47f819bdab7e7b853
tree bc124180421117c94fb8498f29e28024a34b4eb4
parent e4b4b22b08c3ee4218416c3d89e05d3ea410d291
parent 926368c6cbb49c11d2f132acca12404a47a74e42
author 覃明圆 <qinmingyuan@boohee.com> 1418984392 +0800
committer 覃明圆 <qinmingyuan@boohee.com> 1418984392 +0800

Merge branch 'hotfix/out_range_birthday' into 'master'
Hotfix/Out Range Birthday

commit 926368c6cbb49c11d2f132acca12404a47a74e42
tree bc124180421117c94fb8498f29e28024a34b4eb4
parent e4b4b22b08c3ee4218416c3d89e05d3ea410d291
author qinmingyuan <mingyuan0715@foxmail.com> 1418983765 +0800
committer qinmingyuan <mingyuan0715@foxmail.com> 1418983765 +0800

燃脂运动心率默认值
```

### step-2: 基于tree 对象生成一个新的commit 对象

命令：`git commit-tree <tree> -m <message>`  基于tree对象创建 commit对象
这个命令的返回值是一个commit 对象

```
5d002707dc6200c3156a19a90e55f332b23b664b
```

`git cat-file -p 5d002707dc6200c3156a19a90e55f332b23b664b`

```
# 返回值
tree bc124180421117c94fb8498f29e28024a34b4eb4
author qinmingyuan <mingyuan0715@foxmail.com> 1419175304 +0800
committer qinmingyuan <mingyuan0715@foxmail.com> 1419175304 +0800

new commit
```

### step-3：修改其父提交
`git cherry-pick <commit>`
`git replace <old commit> <new commit>`
