---
title: ruby对象的序列化
layout: post
category: ruby
published: true
---

## 什么是序列化对象

在ruby中，有时候需要把一个对象存储起来，比如存到数据库里。
一个ruby对象可能是各种各样的，可能是数组，也可能是一个自定义对象。

如果直接把一个对象交给数据库，数据库就会抗议：你给我的这个东西我又不认识，我可不敢保证你来取的时候，我就能原样找出来还给你。
这个时候ruby就会想办法：那我给你之前，我把这个对象包装成一个你能认出来的东西，比如字符。

这个“包装”的过程就是序列化对象的过程，当ruby从数据库里取出对象的时候，是不能直接使用的，还需要还原对象，也就是反序列化。

## ruby中序列化对象的方法

### Marshal

Marshal可以把对象转化成一个字节流。

```ruby
# 先生成一个Array对象，包含一个Integer对象和Time对象
time = Time.at(1)
value = [1, time]  # => [1, 1970-01-01 08:00:01 +0800]
```

```ruby
# 序列化，序列化的对象是一个String实例
serialize_value = Marshal.dump(value)  
# => "\x04\b[\ai\x06Iu:\tTime\r \x80\x11\x80\x00\x00\x10\x00\a:\voffseti\x02\x80p:\tzoneI\"\bCST\x06:\x06ET"

# 反序列化
obj = Marshal.load(serialize_value)
# => [1, 1970-01-01 08:00:01 +0800]
```

### YAML

```ruby
# 序列化，
serialize_value = YAML.dump(value)  
# => "---\n- 1\n- 1970-01-01 08:00:01.000000000 +08:00\n"

# 反序列化
obj = YAML.load(serialize_value)
# => [1, 1970-01-01 08:00:01 +0800]
```

### JSON

```ruby
# 序列化
serialize_value = JSON.dump(value)  
# => "[1,\"1970-01-01 08:00:01 +0800\"]"

# 反序列化
obj = JSON.load(serialize_value)
# => [1, "1970-01-01 08:00:01 +0800"]

obj[1].class
# => String
```

诶，跟想象中的有点不一样，怎么Time对象还原出来变成String对象了。
这就是不同方法序列化之后的还原能力不同了，很明显Marshal在序列化对象的时候记录了很多信息，除了少数特殊情况，Marshal能够还原出绝大部分对象。
所以尽量采用Marshal序列化对象。
