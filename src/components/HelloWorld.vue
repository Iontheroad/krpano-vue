<template>
  <!-- 
  <button @click="removeHotsport">移除所有热点</button>
  <button @click="loadXmlString">加载xml字符串</button>
  <button @click="loadPano">加载全景</button>
  <button @click="setRandomView">设置随机视图</button>
  <button @click="lookToRandomView">动画查看随机视图</button>
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
      <button @click="getMouseLocation">获取点击位置</button>
      <button @click="transmitXML('来至vue的点击传参')">传递xml</button>
    </div>
    <div class="scene-select-box">
      <ul>
        <li
          v-for="scene in sceneList"
          :key="scene.thumburl"
          :class="{
            'hotspot-detail-scene-selected': currentSceneId == scene.id,
          }"
        >
          <img :src="scene.thumburl" @click="clickToggleScene(scene)" />
          <div>
            <span>{{ scene.name.split(/_/)[1] }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div id="pano"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      krpano: null,
      sceneList: [], // 场景集合
      currentSceneId: 1, // 当前场景的索引
      trackMouseId: null,
      goToHotspotList: [
        {
          // 原生属性
          name: "peak_hotspot_1", // 热点名
          style: "peak_hotspotstyle_animation_tooltip", // 热点样式
          ath: "-122", //
          atv: "-0.21",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          distorted: false,
          url: "static/skin/hotspot/portal.png",
          // 自定义属性
          id: "1", // 热点id
          peak_type: "3", // 热点类型
          peak_sceneId: "1", // 场景图的id
          peak_to_scene: "scene_2", // 要跳转的场景图名
          peak_to_sceneId: "2", // 要跳转的场景图id
          peak_tooltip: "前往神秘大楼", // 设点提示标签内容
        },
        {
          id: "2",
          name: "peak_hotspot_2",
          style: "peak_hotspotstyle_animation_tooltip",
          ath: "-155",
          atv: "2",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          distorted: false,
          url: "static/skin/hotspot/portal.png",

          peak_type: "3",
          peak_sceneId: "2", // 场景图的id
          peak_to_scene: "scene_1",
          peak_to_sceneId: "1", // 要跳转的场景图id
          peak_tooltip: "前往篮球场",
        },
      ], // 跳转热点
      markHotspotList: [
        {
          // 原生属性
          name: "peak_hotspot_6",
          style: "peak_hotspotstyle_tooltip_head",
          ath: "-136.81297139120792",
          atv: "-16.590751927541321",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          ox: "5",
          url: "static/skin/hotspot/line.png",
          // 自定义属性
          id: "6", // 热点id
          peak_type: "2", // 热点类型
          peak_sceneId: "1", // 所在场景图的id
          peak_head:
            "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg", // 提示标签的头像
          peak_tooltip: "我曾经在这里扣篮", // 设点提示标签内容
        },
        {
          id: "7",
          name: "peak_hotspot_7",
          style: "peak_hotspotstyle_tooltip_head",
          ath: "-54",
          atv: "19",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          url: "static/skin/hotspot/line.png",

          peak_type: "2",
          peak_sceneId: "1",
          peak_head:
            "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg",
          peak_tooltip: "挥洒汗水的地方",
        },
        {
          id: "8",
          name: "peak_hotspot_8",
          style: "peak_hotspotstyle_tooltip_head",
          ath: "-73",
          atv: "-11",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          url: "static/skin/hotspot/line.png",

          peak_type: "2",
          peak_sceneId: "2",
          peak_head:
            "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg",
          peak_tooltip: "不知名的神秘大楼",
        },
      ], // 标记热点
    };
  },
  mounted() {
    // console.log(embedpano, "peak");
    window.embedpano({
      swf: "static/tour.swf", // 有则表示加载 flash 引擎，如果设置 html5:only 则不需要该值
      xml: "static/tour.xml", // 启动时的配置文件
      target: "pano", // 要渲染到的目标容器 ID
      html5: "auto", // 如果有需要用到 flash ，可设置为 auto
      //id: "krpanoSWFObject", // 默认的 krpano 对象，每一个 viewer 对应唯一 id ，与 JS 交互时要用到
      mobilescale: 1.0, // 移动设备缩放，1 表示不缩放，默认 0.5
      passQueryParameters: true, // 是否接受 URL 传参，例如：tour.html?html5=only&startscene=scene2
      onready: (krpano_interface) => {
        this.krpano = krpano_interface;
        this.init();
      },
      onerror: (error) => {
        console.log(error);
      },
      // consolelog: true, // 控制台日志
    });
    window.myGetXML = this.transmitXML;
  },

  methods: {
    transmitXML(name) {
      console.log(name);
      // this.krpano.call(`qweqwe_bb(${name})`);
    },

    init() {
      // 获取场景
      // this.krpano.get("xml.scene") // 获取当前的场景名
      // this.krpano.get("scene").getItem(this.krpano.get("xml.scene")) // 获取该场景
      this.sceneList = this.krpano.get("scene").getArray(); // 所有场景图

      setTimeout(() => {
        let currentSceneName = this.krpano.get("xml.scene"); // 当前场景图名称
        this.currentSceneId = this.krpano
          .get("scene")
          .getItem(currentSceneName).id;

        // 获取该场景图下的热点
        this.getSceneHotspot(this.currentSceneId);
      }, 500);
    },

    /**
     * 预览
     */
    preview() {
      window.open("static/tour.html");
    },

    /**
     * 隐藏或者显示下方自带控制面板 control
     */
    krpanoControl(is) {
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
      this.krpano.set("layer[skin_control_bar].visible", is);
      this.krpano.set("layer[skin_splitter_bottom].visible", is);
      this.krpano.set("layer[skin_scroll_window].visible", is);
    },

    /**
     * 点击切换场景
     */
    clickToggleScene(scene) {
      // console.log(scene);
      // 点击的还是当前场景拦截
      // this.krpano.get("xml.scene") // 获取当前的场景名
      if (this.currentSceneId === scene.id) return;
      this.goToScene(scene, 1, false);
    },

    /**
     * 点击热点
     */
    clickHotspot(hotspotInfo) {
      // console.log(hotspotInfo);
      if (hotspotInfo.peak_type == 2) {
        alert("我是普通的热点");
      } else if (hotspotInfo.peak_type == 3) {
        // 跳转热点
        this.goToScene(hotspotInfo);
      }
    },

    /**
     * 场景结合动画跳转
     * @param {number} type
     */
    goToScene(hotspot, type = 1, is = true) {
      let blend;
      switch (type) {
        case 1:
          // 从当前全景图混合/交叉淡入淡出到下一个全景图。
          blend = "BLEND(1.0, easeInCubic)";
          break;
        case 2:
          // 变焦混合
          blend = "ZOOMBLEND(2.0, 2.0, easeInOutSine)";
          break;
        case 3:
          // 打底黑
          blend = "COLORBLEND(2.0, 0x000000, easeOutSine)";
          break;
        case 4:
          // 打底白
          blend = "LIGHTBLEND(1.0, 0xFFFFFF, 2.0, linear)";
          break;
        case 5:
          // 从右到左
          blend = "SLIDEBLEND(1.0, 0.0, 0.2, linear)";
          break;
        case 6:
          // 从上到下
          blend = "SLIDEBLEND(1.0, 90.0, 0.01, linear)";
          break;
        case 7:
          // 沿对角线运动的
          blend = "SLIDEBLEND(1.0, 135.0, 0.4, linear)";
          break;
        case 8:
          // 开口圆
          blend = "OPENBLEND(1.0, 0.0, 0.2, 0.0, linear)";
          break;
        case 9:
          // 垂直性开合
          blend = "OPENBLEND(0.7, 1.0, 0.1, 0.0, linear)";
          break;
        case 10:
          // 水平性开合
          blend = "OPENBLEND(1.0, -1.0, 0.3, 0.0, linear)";
          break;
        case 11:
          // 椭圆+变焦
          blend = "OPENBLEND(1.0, -0.5, 0.3, 0.8, linear)";
          break;

        default:
          break;
      }

      if (!is) {
        this.krpano.call(`loadscene(${hotspot.name}, null, MERGE, ${blend})`);
        this.currentSceneId = hotspot.id;
      } else {
        this.krpano.call(
          `peak_click_to_scene(${hotspot.name},${hotspot.peak_to_scene},${blend},${is});`
        );
        let scene = this.krpano.get("scene").getItem(hotspot.peak_to_scene);
        this.currentSceneId = scene.id;
      }

      setTimeout(() => {
        // 获取场景的热点
        this.getSceneHotspot();
      }, 1000);
    },

    /**
     * 获取场景热点
     */
    getSceneHotspot() {
      [
        ...this.goToHotspotList.filter(
          (item) => item.peak_sceneId == this.currentSceneId
        ),
        ...this.markHotspotList.filter(
          (item) => item.peak_sceneId == this.currentSceneId
        ),
      ].forEach((item) => {
        this.addHotspot(item);
      });
    },

    /**
     * 添加热点
     */
    addHotspot(hotspotInfo) {
      if (this.krpano) {
        // console.log(hotspotInfo);
        // 通过调用krpano对象的call()方法，向全景图中添加一个热点
        this.krpano.call("addhotspot(" + hotspotInfo.name + ")");

        // 设置插件的内容
        // 热点公共属性
        this.krpano.set(`hotspot[${hotspotInfo.name}].ath`, hotspotInfo["ath"]);
        this.krpano.set(`hotspot[${hotspotInfo.name}].atv`, hotspotInfo["atv"]);
        this.krpano.set(
          `hotspot[${hotspotInfo.name}].scale`,
          hotspotInfo["scale"]
        );
        this.krpano.set(
          `hotspot[${hotspotInfo.name}].edge`,
          hotspotInfo["edge"]
        );
        this.krpano.set(`hotspot[${hotspotInfo.name}].oy`, hotspotInfo["oy"]);
        this.krpano.set(`hotspot[${hotspotInfo.name}].ox`, hotspotInfo["ox"]);
        this.krpano.set(`hotspot[${hotspotInfo.name}].url`, hotspotInfo["url"]);
        this.krpano.set(
          `hotspot[${hotspotInfo.name}].peak_tooltip`,
          hotspotInfo["peak_tooltip"]
        );

        // 不同热点类型添加不同的属性
        switch (hotspotInfo.peak_type) {
          case "2":
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].peak_head`,
              hotspotInfo["peak_head"]
            );
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].onloaded`,
              "add_hotspot_tooltip();add_hotspot_head();"
            );
            break;

          case "3":
            // 可跳转的
            // this.krpano.set(`hotspot[${hotspot.name}].style`, hotspot["style"]);
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].linkedscene`,
              hotspotInfo.peak_to_scene
            );
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].onloaded`,
              "do_crop_animation(100,100,15);add_hotspot_tooltip();"
            );
            break;
          default:
            break;
        }

        // 如果当前设备支持HTML5，则将一个匿名函数分配给热点的onclick事件，该函数会弹出一个带有热点名称的警告框
        if (this.krpano.get("device.html5")) {
          // 对于HTML5，可以将JS函数直接分配给krpano事件
          this.krpano.set(
            "hotspot[" + hotspotInfo.name + "].onclick",
            this.clickHotspot.bind(this, hotspotInfo)
          );
        } else {
          // 如果当前设备不支持HTML5，则使用js()函数调用Flash中的JS函数，该函数会弹出一个带有热点名称的警告框。
          // 对于Flash，需要使用js（）操作从Flash调用js（此代码适用于Flash和HTML5）
          this.krpano.set(
            "hotspot[" + hotspotInfo.name + "].onclick",
            "js( alert(calc('hotspot \"' + name + '\" clicked')) );"
          );
        }
      }
    },

    /**
     * 获取当前视角
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
