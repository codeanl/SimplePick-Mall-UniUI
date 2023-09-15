<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import { onMounted, ref } from 'vue'

// 获取页面参数
const query = defineProps<{
  id: number
  name: string
}>()
// const guessList = ref<any[]>([])
// const getHomeGoodsGuessLikeData = async () => {
//   if (query.id) {
//     const res = await getHomeGoodsGuessLikeAPI({ categoryId: query.id })
//     guessList.value = res.data
//   }
//   if (query.name) {
//     const res = await getHomeGoodsGuessLikeAPI({ name: query.name })
//     guessList.value = res.data
//     console.log(query.name);
//   }
// }
// 组件挂载完毕
// onMounted(() => {
//   getHomeGoodsGuessLikeData()
// })

// 分页参数
const pageParams: any = {
  current: 1,
  pageSize: 10,
}
// 猜你喜欢的列表
const guessList = ref<any[]>([])
// 已结束标记
const finish = ref(false)
const getHomeGoodsGuessLikeData = async () => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  if (query.id) {
    pageParams['categoryId'] = parseInt(query.id);
    console.log(pageParams);
    const res = await getHomeGoodsGuessLikeAPI(pageParams)
    // 数组追加
    guessList.value.push(...res.data)
    // 分页条件
    if (pageParams.current < Math.ceil(res.total / pageParams.pageSize)) {
      pageParams.current++
    } else {
      finish.value = true
    }
  }
  if (query.name) {
    pageParams['name'] = query.name
    const res = await getHomeGoodsGuessLikeAPI(pageParams)
    // 数组追加
    guessList.value.push(...res.data)
    // 分页条件
    if (pageParams.current < Math.ceil(res.total / pageParams.pageSize)) {
      // 页码累加
      pageParams.current++
    } else {
      finish.value = true
    }
  }
}
onMounted(() => {
  getHomeGoodsGuessLikeData()
})


</script>

<template>
  <view class="caption">
    <navigator class="search" url="/pages/seacher/index">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </navigator>
  </view>
  <view class="guess">
    <navigator class="guess-item" v-for="item in guessList" :key="item.id" :url="`/pages/goods/index?id=${item.id}`">
      <image class="image" mode="aspectFill" :src="item.pic"></image>
      <view class="name"> {{ item.name }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}

page {
  background-color: #dcdada;
}

/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 16rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;


  .search {
    width: 90%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 0rpx 10rpx;
    color: #242424;
    font-size: 28rpx;
    border-radius: 32rpx;

    .icon-search {
      &::before {
        margin-right: 10rpx;
      }
    }

    .icon-scan {
      font-size: 30rpx;
      padding: 15rpx;
    }
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;

  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }

  .image {
    width: 304rpx;
    height: 304rpx;
  }

  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }

  .small {
    font-size: 80%;
  }
}

// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
