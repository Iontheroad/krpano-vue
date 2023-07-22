<template>
  <div class="container">
    <!-- <div class="action">
      <button @click="preview">预览</button>
      <button @click="krpanoControl(false)">隐藏control</button>
      <button @click="krpanoControl(true)">显示control</button>
      <button @click="getCurrentView">获取当前视图</button>
      <button @click="getMouseLocation">获取点击位置</button>
      <button @click="transmitXML('来至vue的点击传参')">传递xml</button>
    </div> -->

    <!-- 场景导航 -->
    <NavList
      :sceneList="sceneList"
      v-model="currentSceneName"
      @goToScene="goToScene"
    />

    <!-- 工具 -->
    <Tools :krpano="krpano" />
    <AddHotspot
      v-show="isAddHotspotShow"
      v-model="isAddHotspotShow"
      :krpano="krpano"
      :sceneList="sceneList"
      :currentSceneName="currentSceneName"
      :clickMouseLocation="clickMouseLocation"
      @addHotspot="addHotspot"
    />
    <!-- 场景视图 -->
    <div id="pano" @dblclick="dblclickScene"></div>
  </div>
</template>
<script>
import NavList from "./NavList.vue";
import Tools from "./Tools.vue";
import AddHotspot from "./AddHotspot.vue";
export default {
  name: "KrpanoView",
  components: {
    NavList,
    Tools,
    AddHotspot,
  },
  data() {
    return {
      krpano: null,
      currentSceneName: "", // 当前场景的索引
      isAddHotspotShow: false,
      sceneList: [], // 场景集合
      trackMouseId: null,
      clickMouseLocation: {}, // 点击的位置

      // peak_type :  1=>普通热点(无头像)    2=>普通热点(有头像)   3=>可跳转热点
      goToHotspotList: [
        {
          // 原生属性
          scale: 0.5,
          edge: "center",
          oy: "-20",
          distorted: false,
          url: "vtour/skin/hotspot/portal.png",

          //
          id: "1", // 热点id
          name: "peak_hotspot_1", // 热点名
          ath: "-122", //球坐标
          atv: "-0.21",
          peak_type: "3", // 热点类型
          peak_sceneName: "scene_10006", // 所在的场景图名
          peak_to_sceneName: "scene_10007", // 要跳转的场景图名
          peak_tooltip: "前往10007", // 设点提示标签内容
        },
        {
          id: "2",
          name: "peak_hotspot_2",
          ath: "-155",
          atv: "2",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          distorted: false,
          url: "vtour/skin/hotspot/portal.png",

          peak_type: "3",
          peak_sceneName: "scene_10007",
          peak_to_sceneName: "scene_10006",
          peak_tooltip: "前往10006",
        },
      ], // 跳转热点
      markHotspotList: [
        {
          // 原生属性
          name: "peak_hotspot_6",
          ath: "-136.81297139120792",
          atv: "-16.590751927541321",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          ox: "5",
          url: "vtour/skin/hotspot/line.png",
          // 自定义属性
          id: "6", // 热点id
          peak_type: "2", // 热点类型
          peak_sceneName: "scene_10006", // 所在场景图的id
          peak_head:
            "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg", // 提示标签的头像
          peak_tooltip: "我曾经在这里扣篮", // 设点提示标签内容
        },
        {
          id: 7,
          name: "peak_hotspot_7",
          ath: -54,
          atv: 19,
          scale: 0.5,
          edge: "center",
          oy: "-20",
          url: "vtour/skin/hotspot/line.png",

          peak_type: "2",
          peak_sceneName: "scene_10006",
          peak_head:
            "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg",
          peak_tooltip: "挥洒汗水的地方",
        },
        {
          id: "8",
          name: "peak_hotspot_8",
          ath: "-73",
          atv: "-11",
          scale: 0.5,
          edge: "center",
          oy: "-20",
          url: "vtour/skin/hotspot/line.png",

          peak_type: "2",
          peak_sceneName: "scene_10007",
          peak_head:
            "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg",
          peak_tooltip: "不知名的神秘大楼",
        },
      ], // 标记热点
    };
  },
  mounted() {
    window.embedpano({
      // swf: "vtour/tour.swf", // 有则表示加载 flash 引擎，如果设置 html5:only 则不需要该值
      xml: "vtour/tour.xml", // 启动时的配置文件
      target: "pano", // 要渲染到的目标容器 ID
      html5: "auto", // 如果有需要用到 flash ，可设置为 auto
      //id: "krpanoSWFObject", // 默认的 krpano 对象，每一个 viewer 对应唯一 id ，与 JS 交互时要用到
      mobilescale: 1.0, // 移动设备缩放，1 表示不缩放，默认 0.5
      passQueryParameters: true, // 是否接受 URL 传参，例如：tour.html?html5=only&startscene=scene2
      // passQueryParameters: "startscene,startlookat",
      onready: (krpano_interface) => {
        this.krpano = krpano_interface;

        // setTimeout(() => {
        //   this.init();
        // }, 500);
      },
      onerror: (error) => {
        console.log(error);
      },
      // consolelog: true, // 控制台日志
    });
    window.myGetXML = this.transmitXML;
    window.init = this.init;
    window.clickHotspot_xml = (hotspotName) => {
      this.clickHotspot(
        this.goToHotspotList.find((item) => item.name == hotspotName)
      );
    };
  },

  methods: {
    transmitXML(name) {
      console.log(name);
    },

    /**
     * 初始化数据
     *   可以等小行星动画结束在xml里调用
     */
    init() {
      this.sceneList = this.krpano.get("scene").getArray(); // 所有场景图

      this.currentSceneName = this.krpano.get("xml.scene"); // 获取当前的场景名
      // this.currentSceneName = this.krpano
      //   .get("scene")
      //   .getItem(currentSceneName).name;

      // 获取该场景图下的热点
      this.getSceneHotspot(this.currentSceneName);
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
     * 点击热点
     */
    clickHotspot(hotspotInfo) {
      console.log(hotspotInfo, 123);
      if (hotspotInfo.peak_type == 2) {
        alert("我是普通的热点");
      } else if (hotspotInfo.peak_type == 3) {
        // 跳转热点
        // console.log(hotspotInfo);
        this.goToScene({
          hotspotName: hotspotInfo.name,
          peak_to_sceneName: hotspotInfo.peak_to_sceneName,
        });
      }
    },

    /**
     * 获取切换场景的动画类型
     * @param {number} type  跳转的动画类型
     */
    getToggleSceneAnimation(type = 1) {
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

      return blend;
    },

    /**
     * 场景结合动画跳转
     * @param {object} obj 信息
     * @param {string} obj.peak_to_sceneName 跳转的场景名
     * @param {number} animationType  跳转的动画类型
     */
    goToScene(obj, animationType = 1) {
      let blend = this.getToggleSceneAnimation(animationType);

      // this.krpano.call(`loadscene(${obj.name}, null, MERGE, ${blend})`);

      this.krpano.call(
        `peak_click_to_scene(${obj.peak_to_sceneName},${blend},${obj.hotspotName});`
      );

      setTimeout(() => {
        this.currentSceneName = obj.peak_to_sceneName;
        // 获取场景的热点
        this.getSceneHotspot();
      }, 1000);
    },

    /**
     * 获取场景热点
     */
    getSceneHotspot() {
      // this.krpano.call("loop(hotspot.count GT 0, removehotspot(0) );"); // 移除所有热点
      [
        ...this.goToHotspotList.filter(
          (item) => item.peak_sceneName == this.currentSceneName
        ),
        ...this.markHotspotList.filter(
          (item) => item.peak_sceneName == this.currentSceneName
        ),
      ].forEach((item) => {
        this.addHotspot(item);
      });
    },

    /**
     * 获取当前视角
     *    用插件构建的tooltip文本
     */
    _addHotspot(hotspotInfo) {
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
        this.krpano.set(
          `hotspot[${hotspotInfo.name}].text`,
          hotspotInfo["peak_tooltip"]
        );
        // this.krpano.set(`hotspot[${hotspotInfo.name}].normal`, true);
        this.krpano.set(`hotspot[${hotspotInfo.name}].visible`, true);

        // 不同热点类型添加不同的属性
        switch (hotspotInfo.peak_type) {
          case "2":
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].peak_head`,
              hotspotInfo["peak_head"]
            ); // 头像

            this.krpano.set(
              `hotspot[${hotspotInfo.name}].onloaded`,
              "add_hotspot_tooltip();add_hotspot_head();add_hotspot_tooltip_vr();"
            );
            break;

          case "3":
            // 可跳转的
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].linkedscene`,
              hotspotInfo.peak_to_sceneName
            );
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].onloaded`,
              "do_crop_animation(100,100,15);add_hotspot_tooltip();add_hotspot_tooltip_vr()"
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
     * 在全景图中添加热点。
     *   由于插件文本的热点在VR模式下不显示，所以tooltip文本用一个新热点(hotspot)去构建而不是用插件构建(plugin)
     * @param {object} hotspotInfo - 热点信息
     * @param {string} hotspotInfo.name - 热点的名称。
     * @param {number} hotspotInfo.ath - 热点的球形水平位置
     * @param {number} hotspotInfo.atv - 热点的垂直位置
     * @param {number} hotspotInfo.scale - 缩放比例
     * @param {number} hotspotInfo.edge - The edge of the hotspot.
     * @param {number} hotspotInfo.oy - 热点的y坐标
     * @param {number} hotspotInfo.ox - 热点的x坐标
     * @param {string} hotspotInfo.url - 热点的图片
     * @param {string} hotspotInfo.peak_tooltip - 热点的工具提示
     * @param {string} hotspotInfo.peak_type - 热点类型 (2:标记头像热点;3:跳转热点)
     * @param {string} hotspotInfo.peak_head - 热点的头部(只有标记热点才有)
     * @param {string} hotspotInfo.peak_to_sceneName - 要跳转到的场景名称
     * @return {void}
     */
    addHotspot(hotspotInfo) {
      if (this.krpano) {
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
        this.krpano.set(
          `hotspot[${hotspotInfo.name}].peak_type`,
          hotspotInfo["peak_type"]
        );
        this.krpano.set(`hotspot[${hotspotInfo.name}].normal`, false);
        this.krpano.set(`hotspot[${hotspotInfo.name}].visible`, true);

        // 不同热点类型添加不同的属性
        switch (hotspotInfo.peak_type) {
          case "2":
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].peak_head`,
              hotspotInfo["peak_head"]
            ); // 头像

            this.krpano.set(
              `hotspot[${hotspotInfo.name}].onloaded`,
              "add_hotspot_tooltip();add_hotspot_head();"
            );
            break;

          case "3":
            let blend = this.getToggleSceneAnimation(1);
            // 可跳转的
            this.krpano.set(
              `hotspot[${hotspotInfo.name}].peak_to_sceneName`,
              hotspotInfo.peak_to_sceneName
            );
            this.krpano.set(`hotspot[${hotspotInfo.name}].blend`, blend);

            this.krpano.set(
              `hotspot[${hotspotInfo.name}].onloaded`,
              `do_crop_animation(100,100,15);add_hotspot_tooltip_vr(${blend});`
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
     * 双击视图
     */
    dblclickScene() {
      // console.log(this.getMouseLocation());
      this.clickMouseLocation = this.getMouseLocation();
      this.isAddHotspotShow = true;
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
  position: relative;
  width: 100%;
  height: 100%;
}
#pano {
  width: 100%;
  height: 100%;
}
</style>
