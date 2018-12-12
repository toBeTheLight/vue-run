# 区分平台

我们查看的是 web(node 和 浏览器) 平台的代码，所以 Vue 又经过了 web 文件夹下 `/src/platforms/web/runtime/index.js` 文件的处理。

```js
// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

Vue.prototype.__patch__ = inBrowser ? patch : noop

Vue.prototype.$mount = function () { xx }
```