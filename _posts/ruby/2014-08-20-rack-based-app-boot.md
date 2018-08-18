---
title: 基于Rack的项目初始化
layout: post
category: ruby
---

## 1.加载的文件

1.1 config/boot.rb

config/boot.rb 内容如下:

```ruby
# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exist?(ENV['BUNDLE_GEMFILE'])

```

一般我们的项目中都会有一个`Gemfile`文件，用于声明项目所依赖的gem库。
config/boot.rb中的`ENV['BUNDLE_GEMFILE']`指定了Gemfile文件的位置，当Gemfile存在，程序将require bundler/setup,然后 Bundler 会将所有gem加入load path。

1.2 config/environment.rb

config.ru一般将require config/environment.rb 这个文件，这个文件的开头require了 config/application.rb
`require File.expand_path('../application', __FILE__)`

1.3 config/application.rb

一般config/application.rb是应用配置的主文件，这个文件的开头require了 config/boot.rb
`require File.expand_path('../boot', __FILE__)`

## Rack中间件加载

启动 rackup，rackup会自动加载 config.ru 文件。
