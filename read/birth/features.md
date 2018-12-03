# 扩充功能

单纯看 /src/core/index.js 的话，内容很简单，大部分的添加集中在 initGlobalAPI 中。虽然仍然有对 Vue 原型的操作，但是大部分方法和属性还是直接添加到了 Vue 函数本身上的。

先跳过 initGlobalAPI。

```js
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    return this.$vnode && this.$vnode.ssrContext
  }
})

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'
```

* $isServer：判断当前是否为 ssr 的函数。
* $ssrContext：ssr 时的上下文环境，在 Vue 的运行时代码里是看不到 ssrContext 的添加操作的，其添加发生 [vue-server-renderer](https://github.com/vuejs/vue/tree/dev/packages/vue-server-renderer) 这个 ssr 依赖的 render 过程中，其中 ssrContext 由根组件一层一层传递至当前组件，先不做详细介绍。
* FunctionalRenderContext：对外暴露为了解决函数式组件的 ssr 问题，由于函数式组件没有上下文，按照 Vue 的代码逻辑，拿不到服务端渲染过程中添加到 Vue 原型链上的工具函数 ssrHelpers，所以暴露了函数式组件上下文，用以添加 ssrHelpers。