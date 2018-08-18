---
title: Rails日志实现探索（3）
layout: post
category: ruby
---


## 订阅者（接外包）的实现

### `ActiveSupport::Subscriber` 负责干活的订阅者

```ruby
def start(name, id, payload)
  e = ActiveSupport::Notifications::Event.new(name, Time.now, nil, id, payload)
  parent = event_stack.last
  parent << e if parent

  event_stack.push e
end

def finish(name, id, payload)
  finished  = Time.now
  event     = event_stack.pop
  event.end = finished
  event.payload.merge!(payload)

  method = name.split('.').first
  send(method, event)
end
```

## `ActiveSupport::LogSubscriber < ActiveSupport::Subscriber`

```ruby
def start(name, id, payload)
  super if logger
end

def finish(name, id, payload)
  super if logger
rescue Exception => e
  logger.error "Could not log #{name.inspect} event. #{e.class}: #{e.message} #{e.backtrace}"
end
```

这里的 logger 实际是 Rails.logger

## 
