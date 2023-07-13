<template>
  <!-- <button @click="addHotspot">当前位置添加热点</button>
  <button @click="removeHotsport">移除所有热点</button>
  <button @click="loadXmlString">加载xml字符串</button>
  <button @click="loadPano">加载全景</button>
  <button @click="setRandomView">设置随机视图</button>
  <button @click="lookToRandomView">动画查看随机视图</button>
  <button @click="getCurrentView">获取当前视图</button>
  <button @click="trackMouse">跟踪鼠标位置</button>
  <span>{{ trackMouseValue ?? "" }}</span> -->

  <div class="container">
    <div class="action">
      <button @click="preview">预览</button>
      <button @click="krpanoControl(false)">隐藏control</button>
      <button @click="krpanoControl(true)">显示control</button>
      <button @click="getCurrentView">获取当前视图</button>
      <!-- <button @click="setRandomView">设置随机视图</button> -->
      <!-- <button @click="lookToRandomView">动画查看随机视图</button> -->
      <!-- <button @click="getCurrentView">获取当前视图</button> -->
      <button @click="getMouseLocation">获取点击位置</button>
    </div>
    <div class="scene-select-box">
      <ul>
        <li
          v-for="scene in sceneList"
          :key="scene.thumburl"
          :class="{
            'hotspot-detail-scene-selected': currentSceneIndex == scene.index,
          }"
        >
          <img :src="scene.thumburl" @click="changeScene(scene)" />
          <div>
            <span>{{ scene.name.split(/_/)[1] }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div id="pano" @click="clickScene"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      krpano: null,
      sceneList: [], // 场景集合
      currentSceneIndex: 0, // 当前场景的索引
      trackMouseId: null,
    };
  },
  mounted() {
    console.log(embedpano, "peak");
    embedpano({
      swf: "static/tour.swf", // 有则表示加载 flash 引擎，如果设置 html5:only 则不需要该值
      xml: "static/tour.xml", // 启动时的配置文件
      target: "pano", // 要渲染到的目标容器 ID
      html5: "auto", // 如果有需要用到 flash ，可设置为 auto
      //id: "krpanoSWFObject", // 默认的 krpano 对象，每一个 viewer 对应唯一 id ，与 JS 交互时要用到
      mobilescale: 1.0, // 移动设备缩放，1 表示不缩放，默认 0.5
      passQueryParameters: true, // 是否接受 URL 传参，例如：tour.html?html5=only&startscene=scene2
      onready: (krpano_interface) => {
        this.krpano = krpano_interface;
        this.iniParam();
      },
      onerror: (error) => {
        console.log(error);
      },
      // consolelog: true, // 控制台日志
    });
  },

  methods: {
    iniParam() {
      console.log(this.krpano.get("hotspot"), this.krpano.get("view.vlookat"));
      // 获取场景
      // this.krpano.get("xml.scene") // 获取当前的场景名
      // this.krpano.get("scene").getItem(this.krpano.get("xml.scene")) // 获取该场景
      setTimeout(() => {
        this.sceneList = this.krpano.get("scene").getArray(); // 所有场景图
        let currentSceneName = this.krpano.get("xml.scene"); // 当前场景图名称
        this.currentSceneIndex = this.krpano
          .get("scene")
          .getItem(currentSceneName).index; // 获取当前场景图index
      }, 500);
    },

    /**
     * 预览
     */
    preview() {
      window.open("static/tour.html");
    },

    /**
     * 切换当前场景
     */
    changeScene(scene) {
      // 点击的还是当前场景拦截
      if (this.currentSceneIndex === scene.index) return;

      this.currentSceneIndex = scene.index;
      this.krpano.call("loadscene(" + scene.name + ")");
      let newScene = this.sceneList[this.currentSceneIndex];
      //加载临时存储数据应用于krpano
      //自动旋转
      // console.log(newScene);
      if (newScene.autorotate) {
        this.krpano.set("autorotate.enabled", currentScene.autorotate.enabled);
        this.krpano.set(
          "autorotate.waittime",
          currentScene.autorotate.waitTime
        );
      }
    },

    /**
     * 隐藏或者显示下方自带控制面板 control
     */
    krpanoControl: function (e) {
      console.log(this.krpano.get("hotspot[spot1546933175342]"));
      // spot1546933175342
      /* 这段代码使用了krpano库中的set方法来设置一些属性值，具体如下：

        1. this.krpano.set("layer[skin_control_bar].visible", false);
          这行代码将名为"skin_control_bar"的图层的visible属性设置为false，即隐藏该图层。
        2. this.krpano.set("layer[skin_splitter_bottom].visible", false);
          这行代码将名为"skin_splitter_bottom"的图层的visible属性设置为false，即隐藏该图层。
        3. this.krpano.set("layer[skin_scroll_window].visible", false);
          这行代码将名为"skin_scroll_window"的图层的visible属性设置为false，即隐藏该图层。
        通过设置这些图层的visible属性为false，可以隐藏这些图层，从而实现界面上的一些效果，比如隐藏控制栏、底部分割线和滚动窗口等。 */
      this.krpano.set("layer[skin_control_bar].visible", e);
      this.krpano.set("layer[skin_splitter_bottom].visible", e);
      this.krpano.set("layer[skin_scroll_window].visible", e);
    },

    /**
     * 点击场景图
     */
    clickScene() {
      // 拿到点击的坐标
      let { x, y, ath, atv } = this.getMouseLocation();
      let hs_name = "hs" + ((Date.now() + Math.random()) | 0);

      let hotspot = {
        name: hs_name,
        ath,
        atv,
        // title: `我的名字${hs_name}`,
        // distorted: false,
        // scale: 0.5,
        // zoom: false,
        html: `<div class="custom-html">This is a custom HTML tag</div>`,
      };
      console.log("点击了", hotspot);
      this.addHotspot(hotspot);
    },

    /**
     * 添加热点
     */
    addHotspot(hotspot) {
      if (this.krpano) {
        // 通过调用krpano对象的call()方法，向全景图中添加一个热点
        this.krpano.call("addhotspot(" + hotspot.name + ")");
        this.krpano.call(
          "addhotspot(" + hotspot.name + ").addLayer",
          hotspot.html
        );
        // 设置热点的图片路径为"static/skin/vtourskin_hotspot.png"。
        // this.krpano.set(
        //   "hotspot[" + hotspot.name + "].url",
        //   "static/skin/vtourskin_hotspot.png"
        // );
        // 设置插件的类型为HTML
        this.krpano.set(`hotspot[${hotspot.name}].type`, "html");

        // // 设置插件的内容

        for (const key in hotspot) {
          if (Object.hasOwnProperty.call(hotspot, key)) {
            // 排除name
            if (key != "name") {
              // 设置热点的水平和垂直角度为"h"和"v"。
              this.krpano.set(`hotspot[${hotspot.name}].${key}`, hotspot[key]);
            }
          }
        }
        // 如果当前设备支持HTML5，则将一个匿名函数分配给热点的onclick事件，该函数会弹出一个带有热点名称的警告框
        if (this.krpano.get("device.html5")) {
          // 对于HTML5，可以将JS函数直接分配给krpano事件
          this.krpano.set(
            "hotspot[" + hotspot.name + "].onclick",
            function (hs) {
              alert('hotspot "' + hs + '" clicked');
            }.bind(null, hotspot.name)
          );
        } else {
          // 如果当前设备不支持HTML5，则使用js()函数调用Flash中的JS函数，该函数会弹出一个带有热点名称的警告框。
          // 对于Flash，需要使用js（）操作从Flash调用js（此代码适用于Flash和HTML5）
          this.krpano.set(
            "hotspot[" + hotspot.name + "].onclick",
            "js( alert(calc('hotspot \"' + name + '\" clicked')) );"
          );
        }
      }
    },

    /**
     * 居中添加热点
     *
// 假设这段代码在 Vue 组件的方法中
// 调用 krpano 的 spheretoscreen 函数
krpano.call(`spheretoscreen(${this.ath}, ${this.atv}, ${this.hotspotcenterx}, ${this.hotspotcentery}, calc(${this.mouseStagex} LT ${this.stagewidth}/2 ? 'l' : 'r'))`);

     */
    getCurrentView() {
      if (this.krpano) {
        //  获取当前视角的水平和垂直角度，并将它们分别赋给变量"h"和"v"。
        let hlookat = this.krpano.get("view.hlookat");
        let vlookat = this.krpano.get("view.vlookat");
        let fov = this.krpano.get("view.fov");
        let distortion = this.krpano.get("view.distortion");
        console.log({ hlookat, vlookat, fov, distortion });
      }
    },

    /**
     * 获取点击的坐标
     */
    getMouseLocation() {
      let mx = this.krpano.get("mouse.x");
      let my = this.krpano.get("mouse.y");
      let pnt = this.krpano.screentosphere(mx, my);
      let h = pnt.x;
      let v = pnt.y;
      // console.log({
      //   ath: h, // 热点的水平角度位置，以全景图的中心为0度。
      //   atv: v, // 热点的垂直角度位置，以全景图的中心为0度。
      //   x: mx, // x轴 宽
      //   y: my, //y轴  高
      // });
      return {
        ath: h,
        atv: v,
        x: mx,
        y: my,
      };
    },

    createCustomHtmlTag() {
      const { ath, atv } = this.getMouseLocation();
      const pluginName = "customHtmlPlugin"; // 插件的名称，可以自定义

      // 创建插件
      this.krpano.call(`addplugin(${pluginName})`);

      // 设置插件的经纬度坐标
      this.krpano.set(`plugin[${pluginName}].ath`, ath);
      this.krpano.set(`plugin[${pluginName}].atv`, atv);

      // 设置插件的类型为HTML
      this.krpano.set(`plugin[${pluginName}].type`, "html");

      // 设置插件的内容
      this.krpano.set(
        `plugin[${pluginName}].html`,
        '<div class="custom-html">This is a custom HTML tag</div>'
      );

      // 显示插件
      this.krpano.set(`plugin[${pluginName}].visible`, true);
    },

    addMarker() {},
  },
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
}
#pano {
  height: 600px;
}
.scene-select-box {
  ul {
    display: flex;
    li {
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
  .hotspot-detail-scene-selected {
    border: solid #409eff 2px;
  }
}
</style>
