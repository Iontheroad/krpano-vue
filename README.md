# krpano-vue-demo


## 基于 Vue+Krpano 全景项目

### krpano软件 版本
1.19版本破解版网上比较多,但是1.20以上版本基本没有,可以在淘宝购买;
  VR模式下热点tooltip文本使用plugin构建不显示(可能没有找到方法);
    目前解决方法 创建一个新热点hotspot来构建文本(感觉不是最优解);
  注意该版本的vr模式进入后,连接不上;
1.20以上版本支持(切换分支krpano-1.20.11);

### 分支情况
master 和 krpano_versions_1.19-PR13 分支 使用的 1.19-pr13版本krpano生成的全景项目

krpano_versions_1.20.11 分支 使用的是1.20.11版本krpano生成的全景项目


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

如果不考虑vr模式 1.19版本足够了
