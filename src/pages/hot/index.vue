<script setup lang="ts">
import { getHotProductApi } from '@/services/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'


// uniapp 获取页面参数
const query = defineProps<{
  id: number,
  pic: string,
  name: string
}>()
// 动态设置标题
uni.setNavigationBarTitle({ title: query.name })

// 获取热门推荐数据
const productList = ref<any[]>([])
const getHomeHotData = async () => {
  const res = await getHotProductApi(query.id)
  productList.value = res.data
}

// 页面加载
onLoad(() => {
  getHomeHotData()
})

// 滚动触底
const onScrolltolower = async () => {
  // 获取当前选项
  const currsubTypes = subTypes.value[activeIndex.value]
  // 分页条件
  if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
    // 当前页码累加
    currsubTypes.goodsItems.page++
  } else {
    // 标记已结束
    currsubTypes.finish = true
    // 退出并轻提示
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }

  // 调用API传参
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    subType: currsubTypes.id,
    page: currsubTypes.goodsItems.page,
    pageSize: currsubTypes.goodsItems.pageSize,
  })
  // 新的列表选项
  const newsubTypes = res.result.subTypes[activeIndex.value]
  // 数组追加
  currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image class="image" mode="widthFix" :src="query.pic"></image>
    </view>
    <!-- 推荐列表 -->
    <scroll-view enable-back-to-top>
      <view class="goods">
        <navigator hover-class="none" class="navigator" v-for="goods in productList" :key="goods.id"
          :url="`/pages/goods/index?id=${goods.productInfo.id}`">
          <image class="thumb" :src="goods.productInfo.pic"></image>
          <view class="name ellipsis">{{ goods.productInfo.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.productInfo.price }}</text>
          </view>
        </navigator>
      </view>
    </scroll-view>



    <!-- <scroll-view enable-back-to-top v-for="(item, index) in productList" :key="item.id" v-show="activeIndex === index"
      scroll-y class="scroll-view" @scrolltolower="onScrolltolower">
      <view class="goods">
        <navigator hover-class="none" class="navigator" v-for="goods in productList" :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`">
          <image class="thumb" :src="goods.productInfo.pic"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">
        {{ item.finish ? '没有更多数据了~' : '正在加载...' }}
      </view>
    </scroll-view> -->
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  .image {
    width: 750rpx;
  }
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
