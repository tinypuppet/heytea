<template>
	<view class="container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images: [
					'https://static.heytea.com/taro_trial/v1/img/my/member_benefits/level_1_bg.png',
					'https://static.heytea.com/taro_trial/v1/img/my/member_benefits/level_2_bg.png',
					'https://static.heytea.com/taro_trial/v1/img/my/member_benefits/level_3_bg.png',
					'https://static.heytea.com/taro_trial/v1/img/my/member_benefits/level_4_bg.png',
					'https://static.heytea.com/taro_trial/v1/img/my/member_benefits/level_5_bg.png',
					'https://static.heytea.com/taro_trial/v1/img/my/member_benefits/level_6_bg.png',
				]
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
