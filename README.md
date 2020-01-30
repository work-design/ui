## Work UI

Work UI 是 Work Design 所使用的UI框架，是对多个 UI 框架的优化和改进；

* [weui](https://github.com/Tencent/weui)
* [Fomantic-UI](https://github.com/fomantic/Fomantic-UI)
* [bulma](https://github.com/jgthms/bulma)
* [markdown css](https://github.com/sindresorhus/github-markdown-css)

我们对原生框架采用了可插拔，非侵入式的改进。

### 本地开发
1. `git submodule update --init`
2. `yarn install`
3. `yarn run prepare`
4. `yarn run dev`

### 编译与使用
1. `yarn run build`

### 开发指南
- 不让语义化标签影响样式


### 浏览器支持详细

| 功能 | 支持情况 | 涉及组件 |
|---|---|---|
| flex | IE 10 | items, side |

#### 参考文档
[flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
