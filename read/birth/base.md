# 打基础

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

由五个函数名称中共同的部分 **Mixin** 可以看出，当前文件是对 Vue（及其原型）做了 API 添加的操作，而被添加上的部分正是 Vue 运行的基础。（???）

## initMixin

```js
Vue.prototype._init = function () { xx }
```
这个函数只做了一件事，就是将调用 new Vue 实际要执行的函数 _init 混入到了 Vue 的原型链上。

## stateMixin

将数据相关的 API 混入至 Vue。

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

* $data、$prop：使用 Object.defineProperty 方法定义了 $data 和 $prop 的 get 描述符，访问分别返回实例的 _data 和 _prop 属性；定义了 set 描述符，在尝试对 $data、$prop 属性进行重新赋值时给予警告。
* $set、$delete：可以对**响应式**对象数据（当然也包括数组）进行属性增删，并且使此属性响应式激活。
* $watch：观察某个**响应式**数据，并在其变化时做出反应。
