# krpano-vue


## 基于 Vue+Krpano 全景项目
- 使用vue2基于krpano开发的全景项目
- 本案例分别包含 1.19 和 1.20版本(分支)
- 本案例基本可以全部满足全景图开发,建议自创一个模板,慢慢迁移研究本项目功能实现,根据业务调整;
- 该案例还有一些小问题感觉没有最优解:具体查看项目问题;
- 大家一起学习交流,有问题可以提一下大家一起解决;

### krpano软件 版本
- 1.19版本破解版网上比较多,但是1.20以上版本基本没有,可以在淘宝购买;
  - 注意该版本的vr模式进入后,连接不上;
- 1.20以上版本支持(切换分支krpano-1.20.11);
- 如果不考虑vr模式预览(坑比较多) 1.19版本足够了

### 项目问题
- VR模式下热点tooltip文本使用plugin构建不显示(可能没有找到方法);
- 目前解决方法 创建一个新热点hotspot来构建文本(感觉不是最优解);

### 分支情况
- master 和 krpano_versions_1.19-PR13 分支 使用的 1.19-pr13版本krpano生成的全景项目(这俩分支内容一样)
- krpano_versions_1.20.11 分支
  - 使用的是1.20.11版本krpano生成的全景项目,官方不同的版本可能语法不同(还有有一些显示问题)
  - 该分支是根据1.19版本修改的的1.20版本

### 项目地址
- github: https://github.com/Iontheroad/krpano-vue
- gitee: https://gitee.com/Iontheroad/krpano-vue
  - gitee下的预览链接只是单独测试vr模式场景，本案例内容还需拉取分支代码运行体验
- gitCode(csdn): https://gitcode.net/qq_18820417/krpano-vue-demo

### 功能案例
- 与vue代码交互
- 多种热点动态渲染(动态图片+标题,图片+标题)
- 场景跳转动画,场景导航切换
- 场景背景音乐
- js和xml数据交互
- 多参考官网案例 ( https://krpano.com/examples/ )

### 温馨提示
- vr模式,必须 https 协议
  - krpano 软件版本必须1.20以上,越高越好
- vr模式参考官网的例子 https://krpano.com/releases/1.21/viewer/krpano.html?xml=examples/demotour-stereoscopic/tour.xml&html5=webgl+only
  - 也可以参考第三方案例

### 第三方案例
- 这些案例我也没有源码哈,点点体验一下就行
  - 目前跟这些案例差别就是 热点实现方式貌似不太一样(没找到最优解);
- 武功山:  https://220aogq11.wasee.com/wt/220aogq11?def_sid=397566&ath=50.8950&atv=1.3325  这个vr模式可以
- 上海外滩: https://67fbza5ax.wasee.com/s/67fbza5ax?def_sid=341865&ath=18.502886535126436&atv=68.47442859564933 这个vr模式貌似不太行

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


