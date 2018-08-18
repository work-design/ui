---
layout: post
category: ruby
title: 理理File/Dir/Pathname（一）
---

## 引子
最近在写一个涉及到文件操作的小工具，在ruby中有很多方法可以获取文件，对文件进行操作，今天就对这些操作进行一个整理。


| 方法名 | 描述 | 返回结果类型 |
|---|---|---|
| `__FILE__` | `__FILE__`是一个关键字，返回当前文件的绝对路径，包含文件名本身 | String |
| `File.dirname(__FILE__)` | 获取当前文件目录 | String |
| `Pathname.new(__FILE__)` | 获取当前文件目录 | Pathname |
| `Dir.pwd` | 返回当前工作目录，别名方法有：`Dir.getwd` | String |
| \`pwd\` | 返回当前工作目录 | String |
| system('pwd') | 打印当前工作目录，返回值为ture | TrueClass |

## 说明：
### 关于`Pathname`类

ruby提供了一个标准库，`pathname`。


### 调用系统命令
有两种方法可以调用系统命令，一种是使用两个“`”符号将系统命令包起来，一种是使用“system”方法。这两种方法的返回值有所区别。示例如下：

```ruby
`pwd`
# => "/Users/qin/project/blog\n"

system 'pwd'
# 这里会答应出结果
# => true
```

“\`”包装的命令会返回字符串，`system`会将系统命令返回的字符串打印出来，并返回`true/false/nil`中的一个值。

### 当前工作目录，与当前文件目录

这是两个容易混淆的概念，一个是脚本所在的目录，一个是你在哪个目录下调用的脚本，Dir.pwd返回的就是哪个目录。
