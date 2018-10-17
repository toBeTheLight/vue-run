# 简介

简要介绍 `new Vue()` 的执行流程

```js
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```
以上方初始化方式为例，`new Vue(options)` 会将传入配置作为参数调用 Vue **原型链**的 _init 方法`this._init(options)`