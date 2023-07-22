<template>
  <div class="add-hotspot-box">
    <div class="hotspot-inp-box">
      <div>
        热点类型:
        <select name="" id="" v-model="selectValue">
          <option value="2">普通标记</option>
          <option value="3">跳转热点</option>
        </select>
      </div>
      <div v-if="selectValue == 3">
        要跳转的场景:<select name="" id="" v-model="selectSceneId">
          <option
            v-for="scene in sceneList"
            :key="scene.thumburl"
            :value="scene.id"
            :disabled="currentSceneName == scene.id"
          >
            {{ scene.title }}
          </option>
        </select>
      </div>
      <div>热点tooltip:<input type="tooltip" v-model="tooltip" /></div>
      <div>
        <button @click="clickCancel">取消</button>
        <button @click="clickConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddHotspot",
  model: {
    prop: "isAddHotspotShow",
    event: "update:isAddHotspotShow",
  },
  props: {
    isAddHotspotShow: {
      type: Boolean,
      required: true,
    },
    krpano: {
      required: true,
    },
    sceneList: {
      required: true,
    },
    currentSceneName: {
      required: true,
    },
    clickMouseLocation: {
      required: true,
    },
  },
  emits: ["addHotspot"],
  data() {
    return {
      selectValue: "2",
      selectSceneId: "",
      tooltip: "",
      // 跳转热点模板
      toGoTemplate: {
        scale: 0.5,
        edge: "center",
        oy: "-20",
        distorted: false,
        url: "static/skin/hotspot/portal.png",

        // 自定义部分
        // id: "2",
        // name: "peak_hotspot_",
        ath: "-155",
        atv: "2",
        peak_type: "3",
        peak_sceneId: "2", // 场景图的id
        peak_to_scene: "scene_1",
        peak_to_sceneId: "1", // 要跳转的场景图id
        peak_tooltip: "前往篮球场",
      },

      // 普通标记热点模板
      markerTemplate: {
        scale: 0.5,
        edge: "center",
        oy: "-20",
        url: "static/skin/hotspot/line.png",

        ath: "-83",
        atv: "-11",
        id: "8",
        name: "peak_hotspot_8",
        peak_type: "2",
        peak_sceneId: "2",
        peak_head:
          "https://resource.v123.cn/v/Data/upload/live/auth/656/image/5c38805344125.jpg",
        peak_tooltip: "不知名的神秘大楼",
      },
    };
  },
  methods: {
    clickCancel() {
      this.$emit("update:isAddHotspotShow", false);
    },
    clickConfirm() {
      // let currentSceneName = this.krpano.get("xml.scene"); // 当前场景名
      // let currentScene = this.krpano.get("scene").getItem(currentSceneName); // 当前场景

      let { ath, atv } = this.clickMouseLocation; // 鼠标点击球形坐标
      let id = Date.now(); // 热点id
      let name = `peak_hotspot_${id}`; // 热点名称

      let hotspotInfo = {};

      if (this.selectValue == 2) {
        console.log({
          ...this.markerTemplate,
          ath,
          atv,
          id,
          name,
          peak_type: this.selectValue,
          peak_sceneName: this.currentSceneName,
          peak_tooltip: this.tooltip,
        });
      } else if (this.selectValue == 3) {
        console.log({
          ...this.toGoTemplate,
          ath,
          atv,
          id,
          name,
          peak_type: this.selectValue,
          peak_sceneName: this.currentSceneName,
          peak_tooltip: this.tooltip,
          peak_to_sceneName: this.selectSceneId,
          peak_to_scene: this.sceneList.find(
            (item) => item.id == this.selectSceneId
          ),
        });
      }

      this.$emit("addHotspot", {
        ...this.markerTemplate,
        ath,
        atv,
        id,
        name,
        peak_type: this.selectValue,
        peak_sceneId: currentSceneName,
        peak_tooltip: this.tooltip,
      });
      this.$emit("update:isAddHotspotShow", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-hotspot-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  .hotspot-inp-box {
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    // > div {
    // }
  }
}
</style>
