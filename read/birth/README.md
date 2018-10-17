# Vue 构造函数的诞生

在 `new Vue(options)` 被我们调用之前，Vue 函数做了哪些准备工作？

我们以 Runtime + Compiler (web 平台带编译的运行时) 版本代码来看，从 Vue 函数被声明到可以被引用，经历了这些文件。

1. /src/core/instance/index.js
2. /src/core/index.js
3. /src/platforms/web/entry-runtime-with-compiler.js

我们按照顺序看下每个文件内都发生了什么。