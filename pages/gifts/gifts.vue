<template>
	<view class="container">
		<view class="tab-bar">
			<view class="item" v-for="(item, index) in tabBars" :key="index" 
				  :class="{'active': currentTabIndex == index}" 
				  @tap="handleTabChange(index)">
				{{ item }}
			</view>
		</view>
		<swiper :duration="400" class="tab-panes" :current="currentTabIndex">
			<swiper-item class="gift-cards-swiper h-100" @touchmove.stop="handleSwiperItemChange">
				<scroll-view scroll-y="true" class="h-100">
					<image src="https://static.heytea.com/taro_trial/v1/img/my/img_gift_card_banner.png" class="w-100" mode="widthFix"/>
					<!-- 礼品卡列表 begin -->
					<view class="gift-cards">
						<view class="category-list" v-for="(category, index) in giftCards" :key="index">
							<view class="header">
								<view class="title">{{ category.name }}</view>
								<view class="more">
									<view>查看更多</view>
									<image src="/static/images/common/icon_jump_black3.png"></image>
								</view>
							</view>
							<swiper :duration="500" class="product-list" next-margin="220rpx">
								<swiper-item v-for="(product, key) in category.product_list" :key="key" class="product">
									<image :src="product.image_url" class="product-image" @tap="openCardPopup(product)" />
								</swiper-item>
							</swiper>
						</view>
					</view>
					<!-- 礼品卡列表 end -->
					<view class="bottom">
						<view>使用须知</view>
						<view class="divider"></view>
						<view>预付卡章程</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item @touchmove.stop="handleSwiperItemChange" class="my-gift-cards-swiper">
				<view class="header">
					<view class="tab-bar-2">
						<view class="item" :class="{'active': currentTab2Index == 0}" @tap="handleTab2Change(0)">可使用(0)</view>
						<view class="item" :class="{'active': currentTab2Index == 1}" @tap="handleTab2Change(1)">未激活(0)</view>
					</view>
					<view class="right">
						<image src="/static/images/my/icon_giftcard.png"></image>
						<view>阿喜有礼卡兑换</view>
					</view>
				</view>
				<view class="content">
					<swiper :duration="400" class="h-100" :current="currentTab2Index" @change="e => handleTab2Change(e.detail.current)">
						<swiper-item>
							<view class="h-100 d-flex flex-column align-items-center">
								<template v-if="!MyCanUseGiftCards.length">
									<image src="/static/images/my/img_giftcard_empty.png" class="giftcard-empty-img"></image>
									<view class="tips" style="margin: 50rpx 0;">暂无阿喜有礼</view>
									<button type="primary" class="font-size-lg" style="padding: 0 80rpx;" @tap="handleTabChange(0)">
										现在去选购
									</button>
								</template>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="h-100 d-flex flex-column align-items-center">
								<template v-if="!MyCanUseGiftCards.length">
									<image src="/static/images/my/img_giftcard_empty.png" class="giftcard-empty-img"></image>
									<view class="tips" style="margin: 50rpx 0;">暂无阿喜有礼</view>
									<button type="primary" class="font-size-lg" style="padding: 0 80rpx;" @tap="handleTabChange(0)">
										现在去选购
									</button>
								</template>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="bottom">
					<view>购买历史</view>
					<view class="divider"></view>
					<view>收送记录</view>
				</view>
			</swiper-item>
		</swiper>
		<card-popup ref="cardPopup" :product="product" />
	</view>
</template>

<script>
	import CardPopup from './components/CardPopup.vue'
	
	export default {
		components: {
			CardPopup
		},
		data() {
			return {
				giftCards: [],
				tabBars: ['购买阿喜有礼', '我的阿喜有礼'],
				currentTabIndex: 0,
				currentTab2Index: 0,
				myGiftCards: [],
				product: {}
			}
		},
		async onLoad() {
			this.giftCards = await this.$api('giftCards')
		},
		computed: {
			MyCanUseGiftCards() {
				return this.myGiftCards.filter(item => item.status == 1)
			},
			myInactiveGiftCards() {
				return this.myGiftCards.filter(item => item.status == 0)
			}
		},
		methods: {
			handleTabChange(index) {
				this.currentTabIndex = index
			},
			handleSwiperItemChange() {
				return true
			},
			handleTab2Change(index) {
				this.currentTab2Index = index
			},
			openCardPopup(product) {
				this.product = product
				this.$refs['cardPopup'].open()
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab-bar {
	z-index: 10;
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	/* #ifdef H5 */
	top: var(--window-top);
	/* #endif */
	width: 100%;
	height: 100rpx;
	color: $text-color-grey;
	font-size: $font-size-lg;
	display: flex;
	align-items: stretch;
	justify-content: space-evenly;
	
	.item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		
		&.active {
			color: $text-color-base;
			
			&:after {
				content: ' ';
				position: absolute;
				bottom: 0;
				width: 30%;
				left: 35%;
				height: 6rpx;
				background-color: $color-primary;
			}
		}
	}
}

.tab-panes {
	padding-top: 100rpx;
	height: 100%;
	overflow-y: scroll;
}

.gift-cards {
	margin-bottom: 80rpx;
}

.category-list {
	.header {
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.title {
			font-size: $font-size-lg;
			color: $text-color-base;
			font-weight: 700 !important;
		}
		
		.more {
			display: flex;
			align-items: center;
			font-size: $font-size-sm;
			color: $text-color-assist;
			
			image {
				width: 20rpx;
				height: 32rpx;
			}
		}
	}
	
	.product-list {
		padding-left: 30rpx;
		height: 270rpx;
		
		.product {
			
			.product-image {
				border-radius: $border-radius-lg;
				width: 447rpx;
				height: 260rpx;
				box-shadow: 0 0 20rpx 0 rgba($color: $border-color, $alpha: 0.6);
			}
		}
	}
}

.bottom {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: $font-size-sm;
	color: $text-color-assist;
	padding: 30rpx 0;
	
	.divider {
		width: 2rpx;
		background-color: $text-color-assist;
		height: 0.6rem;
		margin: 0 40rpx;
	}
}

.my-gift-cards-swiper {
	display: flex;
	flex-direction: column;
	
	.header {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		align-items: center;
		
		.tab-bar-2 {
			display: flex;
			align-items: center;
			
			.item {
				padding: 10rpx 30rpx;
				font-size: $font-size-base;
				color: $text-color-assist;
				font-weight: 700 !important;
				
				&.active {
					background-color: #FFFFFF;
					color: $color-primary;
				}
			}
		}
		
		.right {
			display: flex;
			align-items: center;
			color: $color-primary;
			font-size: $font-size-base;
			
			image {
				width: 34rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
		}
	}
	
	.content {
		flex: 1;
		
	}
}

.giftcard-empty-img {
	margin-top: 100rpx;
	width: 438rpx;
	height: 291rpx;
}
</style>
