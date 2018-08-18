---
layout: post
title: require 的故事
category: ruby
---

## 引子

关于`require`,一般我们接受到的知识是这样的：

在ruby中，`require`是位于Kernel模块中的一个方法。其方法参数接受一个文件名，如果文件名不是绝对路径，则会依次加入$LOAD_PATH中的路径依次查找，只到找到为止。如果没有找到文件，则会报一个`LoadError`错误。

下面我们来做个试验：

```ruby
require 'a'

LoadError: cannot load such file -- a
from /Users/qin/.rbenv/versions/2.1.5/lib/ruby/2.1.0/rubygems/core_ext/kernel_require.rb:55:in `require'

```

可是这个报错信息是怎么回事？

`require`并没有调用系统默认的Kernel#require，而是调用了位于`rubygems`中`core/ext/kernel_require.rb`中的Kernel#require函数。RubyGem用自己的require替代了系统默认的版本，并藉此实现了它自己的逻辑。

## gem中的`require`

那gem中的`require`到底都做了些什么呢？当我们调用`require 'a'`的时候，如果能够在$LOAD_PATH 中找到这个文件，那`require`的任务就完成了。如果没有找到，`require`就会调用`gem 'a'`,如果能够找到a这个gem，则将其加入$LOAD_PATH 中。

gem中的`require`源码中关于调用gem的部分：

```ruby
def require path
  RUBYGEMS_ACTIVATION_MONITOR.enter

  path = path.to_path if path.respond_to? :to_path

  spec = Gem.find_unresolved_default_spec(path)
  if spec
    Gem.remove_unresolved_default_spec(spec)
    gem(spec.name)  # 在这里调用了gem这个方法
  end

  # ……后续代码省略
end
```

gem中的`require`源码中，当gem方法把当前gem的路径加入到$LOAD_PATH后，继续调用原始`require`方法的部分：

```ruby
def require path
  # ……省略代码
  return gem_original_require(path)  # 本方法中有多处这样的调用，gem_original_require 是gem定义的原生的 require 方法的别名方法
  # ……省略代码
end
```

## gem中的`gem`方法

代码胜千言。我们在调用gem方法之前看下$LOAD_PATH 都有啥：


```ruby
# 进入irb
puts $:

# 返回结果如下
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/site_ruby/2.1.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/site_ruby/2.1.0/x86_64-darwin14.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/site_ruby
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/vendor_ruby/2.1.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/vendor_ruby/2.1.0/x86_64-darwin14.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/vendor_ruby
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/2.1.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/2.1.0/x86_64-darwin14.0
```

接下来我们调用一下 gem 'rails'

```ruby
gem 'rails'
# => true
```

然后我们再看看$LOAD_PATH 发生了什么变化

```ruby
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/i18n-0.7.0.beta1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/thread_safe-0.3.4/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/tzinfo-1.2.2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/activesupport-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/rack-1.6.0.beta/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/rack-test-0.6.2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/mini_portile-0.6.0/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/extensions/x86_64-darwin-14/2.1.0-static/nokogiri-1.6.3.1
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/nokogiri-1.6.3.1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/loofah-2.0.1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/rails-html-sanitizer-1.0.1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/rails-deprecated_sanitizer-1.0.3/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/rails-dom-testing-1.0.3/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/builder-3.2.2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/erubis-2.7.0/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/actionview-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/actionpack-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/activemodel-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/arel-6.0.0.beta1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/activerecord-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/globalid-0.3.0/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/activejob-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/actionmailer-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/thor-0.19.1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/railties-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/bundler-1.7.7/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/sprockets-rails-3.0.0.beta1/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/gems/2.1.0/gems/rails-4.2.0.beta2/lib
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/site_ruby/2.1.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/site_ruby/2.1.0/x86_64-darwin14.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/site_ruby
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/vendor_ruby/2.1.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/vendor_ruby/2.1.0/x86_64-darwin14.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/vendor_ruby
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/2.1.0
/Users/qin/.rbenv/versions/2.1.5/lib/ruby/2.1.0/x86_64-darwin14.0
```

多了好多内容，不仅把`rails`本身加入到了$LOAD_PATH中，还加入了rails依赖的其他gem，这下就可以愉快的使用 require 了。
