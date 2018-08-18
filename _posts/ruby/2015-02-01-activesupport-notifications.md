---
title: Rails日志实现探索（1）
layout: post
category: ruby
---

### 概述
我一直很好奇在Rails中，日志是如何记录一个Rails App运行的信息的。我查看了一下Rails的中间件，发现了`Rails::Rack::Logger`

```
# rake middleware
...
use Rack::MethodOverride
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
...
```
查看`Rails::Rack::Logger`中实现记录日志的主要代码，发现了两个奇怪的类：`ActiveSupport::Notifications`和`ActiveSupport::LogSubscriber`

```ruby
def call_app(request, env)
  # ...
  instrumenter = ActiveSupport::Notifications.instrumenter
  instrumenter.start 'request.action_dispatch', request: request
  logger.info { started_request_message(request) }
  resp = @app.call(env)
  resp[2] = ::Rack::BodyProxy.new(resp[2]) { finish(request) }
  resp
rescue Exception
  finish(request)
  raise
ensure
  ActiveSupport::LogSubscriber.flush_all!
end

```

### 日志功能实现

Rails中对日志的处理采用的是“消息-订阅”机制，各部分组件和功能如下：

* 消息发送：`ActiveSupport::Notifications`
  - `instrument`: 通知subscribers


* 消息订阅：`ActiveSupport::LogSubscriber`
