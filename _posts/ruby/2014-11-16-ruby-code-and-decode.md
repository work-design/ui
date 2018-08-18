---
title: ruby中的编码
layout: post
category: ruby
published: true
---

信息的编码包含两个层面的含义。
一个层面是信息的表达：比如汉字和拼音是两种不同的表达方法。
另一个层面是信息的解读：比如`made`这个字符，拼音可能就是骂人的意思，英文则是`make`的过去分词。
所以编码就是一种协议，以什么协议去编码，就需要以什么协议去解读。

那我们应该选择什么编码协议去编码呢，这个则取决于我们传达信息所采用的工具。
举个例子，我想让一个美国人去给我买个面包，我用中文跟他说，他显然就很难执行我的命令，我得用英语告诉他。

最近的工作中，有一个需求是给客户端传输过去一串html文档，然后客户端解析和渲染这段文档，那我所采用的HTML文档的编码方法就得是客户端能够理解的编码协议。

以下是ruby代码示例：

```ruby
text = "<p>用户卡路里</p>"
# text.encoding => #<Encoding:UTF-8>

base64_text = Base64.encode64(text)  
# => "PHA+55So5oi35Y2h6Lev6YeMPC9wPg==\n"

decode_text = Base64.decode64(base64_text)
# => "<p>\xE7\x94\xA8\xE6\x88\xB7\xE5\x8D\xA1\xE8\xB7\xAF\xE9\x87\x8C</p>"
# decode_text.encoding => #<Encoding:ASCII-8BIT>
# decode_text.force_encoding('utf-8') => "<p>用户卡路里</p>"

base64_strict_text = Base64.strict_encode64(text)
# => "PHA+55So5oi35Y2h6Lev6YeMPC9wPg=="

Base64.strict_decode64(base64_strict_text)
# => "<p>\xE7\x94\xA8\xE6\x88\xB7\xE5\x8D\xA1\xE8\xB7\xAF\xE9\x87\x8C</p>"
```
