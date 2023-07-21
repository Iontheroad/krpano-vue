<template>
  <div class="scene-select-box">
    <ul v-if="sceneList.length">
      <li
        v-for="scene in sceneList"
        :key="scene.thumburl"
        :class="{
          'hotspot-detail-scene-selected': currentSceneId == scene.id,
        }"
      >
        <img :src="scene.thumburl" @click="clickToggleScene(scene)" />
        <div>
          <span>{{ scene.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavList",
  props: {
    krpano: {
      require: true,
    },

    // 场景集合
    sceneList: {
      require: true,
    },

    // 当前场景的索引
    currentSceneId: {
      type: [Number, String],
      require: true,
    },
  },
  emits: [
    "goToScene", // 跳转视图
  ],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    /**
     * 点击切换场景
     */
    clickToggleScene(scene) {
      // 点击的还是当前场景拦截
      if (this.currentSceneId === scene.id) return;
      this.$emit(
        "goToScene",
        {
          peak_to_scene: scene.name,
          peak_to_sceneId: scene.id,
        },
        1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.scene-select-box {
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
  ul {
    display: flex;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    li {
      border-radius: 5px;
      border: solid #ffffff 2px;
      box-sizing: border-box;
      margin: 0px 8px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        cursor: pointer;
      }
      div {
        text-align: center;
      }
      &.hotspot-detail-scene-selected {
        border: solid #409eff 2px;
      }
    }
  }
}
</style>
