<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import Swiper from '../../components/Swiper.vue'
import Guess from '../../components/Guess.vue'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取轮播图数据
const bannerList = ref<any[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.data
}

// 获取前台分类数据
const categoryList = ref<any[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.data
}



// 页面加载
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getHomeCategoryData()])
})

</script>

<template>
  <view class="viewport">
    <!-- 自定义导航栏 -->
    <CustomNavbar />
    <!-- 滚动容器 -->
    <scroll-view enable-back-to-top refresher-enabled @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered" @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
      <template>
        <!-- 自定义轮播图 -->
        <Swiper :list="bannerList" />
        <!-- 分类面板 -->
        <CategoryPanel :list="categoryList" />
        <!-- 热门推荐 -->
        <!-- <HotPanel :list="hotList" /> -->
        <!-- 猜你喜欢 -->
        <Guess ref="guessRef" />
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>