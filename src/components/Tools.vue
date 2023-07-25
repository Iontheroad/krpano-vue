<template>
  <div class="tools-box">
    <!-- 音频 -->
    <div
      v-if="isAudioPlay"
      class="btn audio-btn"
      @click="clickAudio(false)"
    ></div>
    <div
      v-else
      class="btn audio-btn audio-stop"
      @click="clickAudio(true)"
    ></div>
    <div class="btn" @click="clickVR">VR</div>
  </div>
</template>

<script>
export default {
  name: "Tools",
  props: {
    // 实例
    krpano: {
      require: true,
    },
  },
  data() {
    return {
      isAudioPlay: false, // 是否播放音频(默认关闭)
    };
  },
  methods: {
    clickAudio(isAudioPlay) {
      this.isAudioPlay = isAudioPlay;
      this.krpano.call(`peak_audio(${isAudioPlay})`);
    },
    clickVR() {
      this.krpano.call("webvr.enterVR();");
      // this.krpano.call("peak_enterVR();");
    },
  },
};
</script>

<style lang="scss" scoped>
.tools-box {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 10px;
  border-radius: 10px;
  // background-color: #f2eded;
  .btn {
    width: 30px;
    height: 30px;
    background-color: rgb(215, 215, 215);
    border: 5px solid rgb(215, 215, 215);
    border-radius: 10px;
    margin: 5px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .audio-btn {
    background: rgb(216, 216, 216) url("../assets/soundonoff.png") no-repeat;
    background-size: 100%;
    &.audio-stop {
      background-position: 5px -30px;
    }
  }
}
</style>
