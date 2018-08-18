---
title: Rails中间件
layout: post
category: ruby
---

## rails 常见中间件介绍

### Rack中定义的中间件

#### `Rack::Lock`  
线程锁, 保证 rails 代码单线程运行, 同时设置 env['rack.multithread'] = false, 你可以通过设置 config.allow_concurrency = true 来去掉该中间件

#### `Rack::Runtime`
统计运行时间, 放在 response 的 "X-Runtime" header 中

#### `Rack::Sendfile`  
如果返回数据已经放在一个文件里边了(比如生成的 PDF), 则可以让 nginx 服务器直接从该文件读取，降低系统消耗

#### `Rack::MethodOverride`  
支持用 POST 来模拟 PUT, DELETE, ..., 可以在 POST 使用 _method 参数，也可以使用 HTTP 头 "HTTP_X_HTTP_METHOD_OVERRIDE"

#### `Rails::Rack::Logger`  
比如 log/development.log 中的这一行 "Started GET "/" for 127.0.0.1 at Wed Sep 15 21:46:51 +0800 2010"


### ActionDispatch 中定义的中间件

#### `ActionDispatch::Static`
静态文件(即 public/的文件)支持, 一般在生产环境下会禁用此功能

#### `ActionDispatch::ShowExceptions`
截获异常，把异常转换为 HTTP 错误号 (一般转为 500, 但一些特殊异常转到相应的错误号，比如 "ActionController::MethodNotAllowed" 会被转为 405, 同时显示对应的错误页面，对应开发环境，会显示异常的 backtrace, 对于生产环境，则会显示 public/500.html, 对于测试环境，该中间件会被禁用，直接把异常抛出

#### `ActionDispatch::RemoteIp`
解决服务器转发, 代理导致客户端真实 IP 丢失的问题，用户的真实IP放在 env["action_dispatch.remote_ip"]

#### `ActionDispatch::Callbacks`
测试环境下用于检测源文件是否改变, 产品环境下作用不明 (TODO)

#### `ActionDispatch::Cookies`
cookie 支持

#### `ActionDispatch::Session::CookieStore`
session 支持，此处使用 cookie store

#### `ActionDispatch::Flash`
flash 支持， 参见 http://guides.rubyonrails.org/action_controller_overview.html#the-flash

#### `ActionDispatch::ParamsParser`
分析XML， JSON参数，放到 env["action_dispatch.request.request_parameters"]

#### `ActionDispatch::Head`
把 HEAD 请求转为 GET 请求, 同时设置 env["rack.methodoverride.original_method"] = "HEAD"

#### `ActionDispatch::BestStandardsSupport`
设置 HTTP 头: X-UA-Compatible

#### `ProjectName::Application.routes`
终于进入你的 rails 程序了, 开始路由, 同时开始使用 rails 的协议栈
