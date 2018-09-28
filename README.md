# H5小游戏

> A H5 game

### 访问地址
```
http://localhost:3000/index.html
http://192.168.1.105:3000/index.html
```

### 运行程序 
```
cd 到项目目录overfly

编译: egret build overfly/
运行(添加参数 -a 来启动自动编译): egret run -a overfly/

```

### 项目目录说明
```
.
|-- .wing                         // 包括 Egret 项目的任务配置文件和启动配置文件。
|   |-- 
|-- bin-debug                     // 项目调试时，所产生的文件存放于此目录。
|-- libs                          // 库文件，包括 Egret 核心库和其他扩展库存放于此目录。
|-- resource                      // 项目资源文件存放于此目录。
|   |--assets                     // 项目各资源文件 -- 图片、音效等，按组件分文件夹，项目初始化时候和自定义资源。
|   |   |--MyResource             // 项目中自定义资源文件 -- 项目游戏相关中使用的文件。
|   |--config                     // 项目中资源配置文件 -- 图片音效、皮肤等相关资源配置。
|   |--eui_skins                  // 项目资源文件 -- 皮肤文件exml格式文件，项目初始化时候和自定义资源。
|-- scripts                       // 项目构建和发布时需要用到的脚本文件存放在此目录。
|-- src                           // 项目代码文件存放于此目录。
|-- template                      // 项目模板文件存放于此目录。
|-- egretProperties.json          // 项目的配置文件。具体的配置说明可以参考：EgretProperties说明。
|-- index.html                    // 入口文件。具体的配置说明可以参考：入口文件说明。
|-- manifest.json                 // 网页清单文件。
|-- tsconfig.json                 // typescript 编译配置文件。
|-- README.md                     // 项目说明。
|-- wingProperties.json           // Egret Wing 项目配置文件。
.
```
### 参考文档 
```
Egret Engine 2D API
http://developer.egret.com/cn/github/egret-docs/Engine2D/update/update529/index.html

Egret扩展库 API
http://developer.egret.com/cn/github/egret-docs/extension/threes/instructions/index.html

EUI API
http://edn.egret.com/cn/index.php/apidoc/egret243/name/eui.AddItems

```

### 涉及到修改
```
// comment by gn Line 79
描述为被gn注释的，79为注释的行号。

```
