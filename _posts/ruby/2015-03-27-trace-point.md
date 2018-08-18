---
layout: post
category: ruby
title: TracePoint介绍
---

## 引子
最近发布了一次app升级，发现日志里总是报一个警告：`Digest::Digest is deprecated; use Digest`。

已经确定这个错误不是从app里报出来的，而是来自于某个依赖的gem。

而我们引用的gem有100多个，要找到这个警告来自于哪个gem还真是很伤神。

在网上找解决方案的时候发现了一个方法：`set_trace_func`。在新版本的ruby（2.1.5以上）中，这个方法已经废弃了，ruby提供了一个更好的的替代：核心类`TracePoint`。

## TracePoint介绍

`TracePoint`可以用来收集特定的事件在被调用时的信息。

这些事件包括：

* `line`: 执行下一行代码；
* `raise`: 抛出异常；

* `class`: 开始定义一个`class`或`module`；
* `end`: 结束定义一个`class`或`module`;

* `call`：调用一个ruby定义方法的时候；
* `return`: 从一个ruby方法中返回；

* `c_call`: 调用一个c语言程序；
* `c_return`: 从一个C语言程序的调用中返回；

* `b_call`: 调用一个`block`;
* `b_return`: `block`调用结束；

* `thread_begin`: 开启一个新线程；
* `thread_end`: 一个线程结束；

针对这些事件，支持的信息有：

* binding
* defined_class
* disable
* enable
* enabled?
* event
* inspect
* lineno
* method_id
* path
* raised_exception
* return_value
* self

当然并不是所有的事件都支持这些信息，如果调用的事件不支持某个事件的时候，将会抛出一个`RuntimeError`。

## 使用实战
