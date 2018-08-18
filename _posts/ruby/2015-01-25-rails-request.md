---
layout: post
title: Rails中的request
category: ruby
---

每个web请求都有对应的 Request和Response，在Rails中，我们如何获取关于request的信息呢？

### Request对象

在controller的实例中，可以通过request方法获取request对象

```ruby
request
# => ActionDispatch::Request对象
```

## Request对象包含的内容

### Headers

```ruby
request.headers
# => #<ActionDispatch::Http::Headers:0x007ff849c55a50>
```
headers分为：
`request.headers`
`response.headers`

### Params

```ruby
request.params # => ActiveSupport::HashWithIndifferentAccess对象
request.parameters # 同request.params
request.path_parameters
```
`params` 返回的是 ActionController::Parameters 对象

### Method

```ruby
request.method # => "GET"，String对象
request.method_symbol  # => :get，Symbol对象
request.request_method_symbol

request.get?
request.post?
request.put?
request.patch?
request.delete?
request.head?
```

### Url

```ruby
request.fullpath
request.original_fullpath
request.original_url
```

### 请求内容

```ruby
request.body  # => StringIO对象
request.body_stream

request.raw_post

request.form_data?

request.xml_http_request?
request.authorization
```

###  MIME等信息

```ruby
request.media_type
request.accepts
request.content_type
request.formats
request.format
request.variant
```

### 客户端、服务端、中间件信息

```ruby
request.ip
request.remote_ip
request.local?

request.uuid

request.server_software
```

### 缓存相关信息

```ruby
request.if_modified_since
request.if_none_match
request.if_none_match_etags
```
