---
layout: post
category: ruby
title: ObjectSpace介绍
---

最近在调试bug的时候，遇到一个诡异的错误，错误信息中如下：

```ruby
#<NoMethodError: undefined method `to_sym' for #<Object:0x007ff53a0e1578>>
```

接下来我就懵了，这个`#<Object:0x007ff53a0e1578>`对象到底是什么，我该如何知道它的本来面目呢。于是我想到了`ObjectSpace`

`ObjectSpace`是ruby的一个核心module，它本来是为ruby的垃圾回收工作提供服务的一个模块，同时提供了方法让我们可以跟踪到ruby中还存活对象。

每个对象都有一个唯一的`object_id`,`object_id`与内存地址存在一定的映射关系，上例中`0x007ff53a0e1578`就是这个对象内存地址的一个映射，其`object_id`为`0x007ff53a0e1578 / 2 = 70345608858300`。
有了`object_id`，ObjectSpace就能帮我们还原这个对象的真实面目了。

```ruby
ObjectSpace._id2ref(70345608858300)

# 返回结果如下
{
               "RBENV_VERSION" => "2.1.5",
                "TERM_PROGRAM" => "iTerm.app",
                        "TERM" => "xterm-256color",
                       "SHELL" => "/bin/zsh",
                      "TMPDIR" => "/var/folders/qy/x2mgpc052csdx4vvyp2b7wsm0000gn/T/",
  "Apple_PubSub_Socket_Render" => "/private/tmp/com.apple.launchd.XcJLqAwJLx/Render",
                         "ZSH" => "/Users/qin/.oh-my-zsh",
                         # …
}
```
原来这个Object对象就是ENV，这下问题就好查起了。

除了`_id2ref`这个神奇的方法，ObjectSpace还提供了一些很有意思的方法。

- count_objects：统计各种类型的对象

```
{
       :TOTAL => 419013,
        :FREE => 329,
    :T_OBJECT => 14056,
     :T_CLASS => 6063,
    :T_MODULE => 922,
     :T_FLOAT => 9,
    :T_STRING => 250253,
    :T_REGEXP => 2352,
     :T_ARRAY => 61635,
      :T_HASH => 10083,
    :T_STRUCT => 481,
    :T_BIGNUM => 13,
      :T_FILE => 29,
      :T_DATA => 40450,
     :T_MATCH => 134,
   :T_COMPLEX => 1,
  :T_RATIONAL => 891,
      :T_NODE => 29990,
    :T_ICLASS => 1322
}
```
基本类型的统计信息一应俱全；

更多方法请参考文档。
