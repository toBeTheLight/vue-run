# 打下基础

我们在 `/core/instance/index.js` 文件中可以看到最初的函数声明和 5 个对 Vue 的处理函数

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

由五个函数名称中共同的部分 **Mixin** 可以看出，当前文件是对 Vue（其原型）做了 API 添加的操作，而被添加上的部分正是 Vue 运行的基础。

## initMixin

这个函数只做了一件事，就是将调用 new Vue() 时实际要执行的函数 _init 添加至 Vue 的原型。

```js
Vue.prototype._init = function () { xx }
```

## stateMixin

处理 $data、$props，并将数据相关的 API 添加至 Vue 的原型。

简化后的代码：
```js
Object.defineProperty(Vue.prototype, '$data', {
  get () {},
  set () {},
})
Object.defineProperty(Vue.prototype, '$props', {
  get () {},
  set () {},
})
Vue.prototype.$set = function () { xx }
Vue.prototype.$delete = function () { xx }
Vue.prototype.$watch = function () { xx }
```

* $data、$prop：
  * 使用 Object.defineProperty 方法定义了 $data 和 $prop 的 get 描述符和 set 描述符
  * 定义了 get 描述符，访问分别返回实例的 _data 和 _prop 属性
  * 定义了 set 描述符，在尝试对 $data、$prop 属性进行重新赋值时给予警告。
* $set、$delete：可以对**响应式**对象数据（当然也包括数组）进行属性增删，并且使此属性响应式激活。
* $watch：观察某个**响应式**数据，并在其变化时做出反应。

## eventsMixin

将事件相关的 API 添加至 Vue 的原型。

```js
Vue.prototype.$on = function () { xx }
Vue.prototype.$once = function () { xx }
Vue.prototype.$off = function () { xx }
Vue.prototype.$emit = function () { xx }
```

* $on：用来给**组件**添加事件监听，即模板渲染时真实 dom 标签的事件监听和带有 .native 修饰符的事件监听不会经过此 API。
* $once：同 $on ，但仅执行一次。
* $off：取消事件监听。
* $emit：对应 $on，触发事件监听。

## lifecycleMixin

将与生命周期相关的 API 添加至 Vue 的原型，注意并不是生命周期钩子函数。

```js
Vue.prototype._update = function (vnode, hydrating) { xx }
Vue.prototype.$forceUpdate = function () {}
Vue.prototype.$destroy = function () {}
```

* _update：调用此方法将对实例进行更新，当然包括初始化渲染为页面实际 dom。
* $forceUpdate：内部会调用组件实例的 _watcher（渲染所对应的 watcher），且只会渲染实例本身和被传入实例模板一部分作为 slot 的子组件。
* $destroy：销毁实例（脱离于其他实例的连接，销毁指令和事件监听），但是并不会摧毁已经渲染在页面的 dom。

## renderMixin

将渲染相关的 API 添加至 Vue 的原型。

```js
installRenderHelpers(Vue.prototype)
Vue.prototype.$nextTick = function (fn) { xx}
Vue.prototype._render = function () { xx }
```

* installRenderHelpers：向 Vue 原型添加 render 所需的工具函数。
* $nextTick：在下次 DOM 渲染更新循环之后执行传入的函数。
* _render：其实是将实例编译为 vnode，用于渲染，后续渲染通过 [_update](#lifecyclemixin)方法实现。

## 结束

那么在 /core/instance/index.js 文件中对 Vue 的处理我们就粗略的看完了。至此 Vue 的原型变为了

```js
{
  _init: f(),
  $data: (...)
  get $data: f()
  set $data: f()
  $props: (...)
  get $props: f()
  set $props: f()
  $set: f()
  $delete: f()
  $watch: f()
  $on: f()
  $once: f()
  $off: f()
  $emit: f()
  _update: f()
  $forceUpdate: f()
  $destroy: f()
  //.. 省略一些 render 工具 api
  $nextTick: f()
  _render: f()
}
```