<template>
  <div class="wrapper">
    <div class="text">
      <div class="btn" @click="changeExpandCollapse">{{ statusText }}</div>
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup name="SpTextExpandCollapse">
import { withDefaults, defineProps, ref } from 'vue'

interface PropsType {
  text: string
}

const props = withDefaults(defineProps<PropsType>(), {
  text: ''
})
// let status = ref('4.5em')
let status = ref('3')
let statusText = ref('展开')
let statusMark = ref('initial')

const changeExpandCollapse = (a) => {
  if (status.value === '3') {
    // status.value = 'none'
    status.value = '999'
    statusText.value = '收起'
    statusMark.value = 'hidden'
  } else {
    // status.value = '4.5em'
    status.value = '3'
    statusText.value = '展开'
    statusMark.value = 'initial'
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  flex-shrink: initial !important;
  display: flex;
  width: 100%;
  overflow: hidden;
}

.text {
  flex-shrink: initial !important;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: v-bind("status");
  -webkit-box-orient: vertical;
  // line-height: 1.5;
  line-height: 45rpx;
  // max-height: v-bind("status");

  position: relative;
  color: #666A6A;
}

.text::before {
  content: '';
  height: calc(100% - 45rpx);
  width: 0;
  /*设置为0，或者不设置宽度*/
  float: right;
}

.btn {
  flex-shrink: initial !important;
  position: relative;
  float: right;
  clear: both;
  // margin-left: 40rpx;
  font-size: 28rpx;
  color: #0086CC;
  line-height: 40rpx;
  // padding: 0 16rpx;
  cursor: pointer;
  border: 0;
  overflow: v-bind("statusMark");
}

// .btn::before {
//   content: '...';
//   position: absolute;
//   left: -10rpx;
//   color: #333;
//   transform: translateX(-100%)
// }
</style>
