---
layout: post
title: rescue exception in ruby
category: ruby
---
`Exception`是ruby中所以异常会继承的父类，当我们在ruby中rescue异常类的时候，如果没有指定具体的异常类。
rescue拦截的实际是所有的标准类。

```ruby
begin
  #...
rescue  # 没有指定异常类，拦截异常类默认为 `StandardError`
  #...
end
```

可以为异常类指定一个变量

```ruby
begin
  #...
rescue => e
  #...
end
```

以上用法的完整版本为：

```ruby
begin
  # iceberg!
rescue StandardError => e
  # lifeboats
end
```

以下用法会拦截所有的错误，通常情况下是不建议的。主要应用场景为日志相关。
```ruby
begin
# iceberg?
rescue Exception => e
# do some logging
end
```
