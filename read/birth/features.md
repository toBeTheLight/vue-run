# 扩充功能

单纯看 `/src/core/index.js` 的话，内容很简单，大部分的添加集中在 initGlobalAPI 中。虽然仍然有对 Vue 原型的操作，但是大部分方法和属性还是直接添加到了 Vue 函数本身上的。

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

## initGlobalAPI

```js
Object.defineProperty(Vue, 'config', configDef)

Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive
}

Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick

Vue.options = Object.create(null)
ASSET_TYPES.forEach(type => {
  Vue.options[type + 's'] = Object.create(null)
})
Vue.options._base = Vue
extend(Vue.options.components, builtInComponents)

initUse(Vue)
initMixin(Vue)
initExtend(Vue)
initAssetRegisters(Vue)
```
* Vue.config：使用 Object.defineProperty 定义了不能直接复写 config 属性，只允许修改 config 中的字段。
* Vue.util：**非对外**的工具方法。
* Vue.set：同 [Vue.prototype.$set](/birth/base.html#statemixin)
* Vue.delete：同 [Vue.prototype.$delete](/birth/base.html#statemixin)
* Vue.nextTick：同 [Vue.prototype.$nextTick](/birth/base.html#rendermixin)
* Vue.options 这几行：
  * options 里根据 **ASSET_TYPES** 添加了几个初始属性 components、directives、filters，这几个属性初始值为空对象，用来做全局注册资源的存储。
  * Vue.options._base = Vue：按照注释，是为了 weex 做的调整。
  * extend 这行：将内建组件存放进 `options.components`，当前内建组件仅有 KeepAlive 组件。
* initUse(Vue)：添加 Vue.use 方法。
* initMixin(Vue)：添加 Vue.mixin 方法。
* initExtend(Vue)：添加 Vue.extend 方法。
* initAssetRegisters(Vue)：同样根据 **ASSET_TYPES**，对 Vue 添加了 Vue.component、Vue.directive、Vue.filter api，通过这些 api 全局注册的组件、指令、过滤器会被存入上述的 Vue.options 的对应字段中。

## 变化

那么至此 
Vue 原型又被添加了这些属性和方法
```js
{
  $isServer: (...)
  get $isServer: f()
  $ssrContext: (...)
  get $ssrContext: f()
  FunctionalRenderContext: f()
}
```
Vue 本身被添加了这些方法和属性
```js
{
  config: (...)
  util: (...)
  set: f()
  delete: f()
  nextTick: f()
  options: (...)
  use: f()
  mixin: f()
  extend: f()
  component: f()
  directive: f()
  filter: f()
}
```