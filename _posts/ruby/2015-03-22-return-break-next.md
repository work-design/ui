---
layout: post
category: ruby
title: ruby中的return
---

在ruby中，有三个关键字可以从一段代码中返回，分别是`return`、`next`、`break`，今天主要研究一下return。

## 方法中的return

在ruby中调用一个方法，默认的情况下，会一行一行依次执行方法中的代码，方法的值是最后一行的值。

return可以改变这个方法一行一行执行的行为，当遇到return，方法会直接返回（rescue、ensure例外）。

```ruby
def test
  puts 'first puts'
  return
  puts 'next puts'
end
```
在上面这个例子中，`puts 'next puts'`这行代码永远不会执行。同时我们可以显示指定返回值，默认为nil。例如上面这个例子没有指定返回值，其返回值则为nil。

## proc中的return

代码胜千言，先看几个例子：

```ruby
def test1
  proc = Proc.new { return 10 }
  puts 'puts here'
end

def test2
  proc = Proc.new { return 10 }
  proc.call
  puts 'puts here'
end

def test3
  return 10
  puts 'puts here'
end

test4 = Proc.new { return 10 }
test4.call
```
在上面的例子中：

* `test1`方法，`puts 'puts here'`能够执行，返回值为最后一行代码的返回值。

* `test2`方法，返回值为10。

* `test3`方法的行为和`test2`是等价的。

* `test4`在call调用的时候会报错，错误信息是：`LocalJumpError: unexpected return`;

为什么会这样，其实`test2`和`test3`已经告诉我们答案了，在proc中使用 return 和在方法本身中使用return的效果是一样的。

而`test4`的例子就相当于你直接执行`return 10`，报的错误也同样是：`LocalJumpError: unexpected return`

`LocalJumpError`这个错误其实很有意思，如果拦截这个错误，是依然可以拿到return的返回值的。
下面是我在pry中做的实验。

```ruby
return 10
#=> LocalJumpError: unexpected return

_ex_
#=> <LocalJumpError: unexpected return>

_ex_.class
#=> LocalJumpError < StandardError

_ex_.exit_value
#=> 10

_ex_.reason
#=> :return
```

## lambda 中的return

还是继续看例子：

```ruby
test1 = -> { puts 'first puts'; return 10; puts 'next puts' }
test1.call

# first puts
#=> 10

def test2
  la = -> { puts 'first puts'; return 10; puts 'next puts' }
  la.call
  puts 'puts here'
end

# first puts
# puts here
#=> nil
```

lambda对象，跟proc对象不一样，在lambda中，return是从lambda代码块中返回。在proc中，return是从proc代码块所在的上下文环境中返回。
