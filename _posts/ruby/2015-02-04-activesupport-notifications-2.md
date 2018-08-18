---
title: Rails日志实现探索（2）
layout: post
category: ruby
---


## 日志功能实现

Rails中对日志的处理采用的是“消息-订阅”机制，各部分组件和功能如下：

### 日志消息的发送：`ActiveSupport::Notifications`

- `instrument`： 通知所有的 subscribers

扩展：可在通知前先执行一个代码块；

```ruby
ActiveSupport::Notifications.instrument('render', extra: :information) do
  render text: 'Foo'
end
```

* `ActiveSupport::Notifications::Instrumenter`: 下发通知的组织

* `ActiveSupport::Notifications::Fanout`: 下发通知的执行人

## 工作流程

### 安排下发通知的人

```ruby
# 1、每个事件分配一个执行人员（员工）
ActiveSupport::Notifications.notifier = ActiveSupport::Notifications::Fanout.new

# 2、不能瞎指派员工，指派的员工须得有这个能力
if notifier.listening?(name)
  instrumenter.instrument(name, payload) { yield payload if block_given? }
end

# 3、通过员工的上级领导（cto）分配工作
def instrumenter
  InstrumentationRegistry.instance.instrumenter_for(notifier)
end
```

### 具体工作

1、`Instrumenter`安排工作

```ruby
# Send a start notification with +name+ and +payload+.
def start(name, payload)
  @notifier.start name, @id, payload
end

# Send a finish notification with +name+ and +payload+.
def finish(name, payload)
  @notifier.finish name, @id, payload
end
```

2、`Fanout` 接受任务开始干活

```ruby
def start(name, id, payload)
  listeners_for(name).each { |s| s.start(name, id, payload) }
end

def finish(name, id, payload)
  listeners_for(name).each { |s| s.finish(name, id, payload) }
end

def publish(name, *args)
  listeners_for(name).each { |s| s.publish(name, *args) }

  # s 为`ActiveSupport::Notifications::Fanout::Subscribers::Evented`实例
end
```
干活的人多了个`publish`方法，反馈任务（员工需要汇报工作）

3、`ActiveSupport::Notifications::Fanout::Subscribers::Evented` 具体的任务

```ruby
def publish(name, *args)
  if @can_publish
    @delegate.publish name, *args
  end
end

def start(name, id, payload)
  @delegate.start name, id, payload
end

def finish(name, id, payload)
  @delegate.finish name, id, payload
end
```
`delegate` 这个又是谁呢？

## 答案揭晓

其实这个员工他也不干活，他将工作外包出去了！！！
