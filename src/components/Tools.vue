<template>
  <div class="tools-box">
    <!-- 音频 -->
    <div v-if="isAudioPlay" class="audio-btn" @click="clickAudio(false)"></div>
    <div v-else class="audio-btn audio-stop" @click="clickAudio(true)"></div>
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
  .audio-btn {
    width: 30px;
    height: 30px;
    background: #000 url("../assets/soundonoff.png") no-repeat;
    background-size: 100%;
    background-color: rgb(255, 255, 255);
    border: 5px solid rgb(255, 255, 255);
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
    &.audio-stop {
      background-position: 5px -30px;
    }
  }
}
</style>
