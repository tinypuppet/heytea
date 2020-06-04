<template>
	<view class="container">
		<swiper class="materials-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(url, index) in detail.materialUrls" :key="index">
				<image :src="url" class="w-100" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="p-30 bg-white mb-20">
			<view class="d-flex justify-content-between align-items-center mb-30">
				<view class="font-size-extra-lg text-color-primary font-weight-bold">￥{{ parseFloat(detail.salePrice / 100) }}</view>
				<view class="font-size-sm text-color-assist">{{ detail.itemSalesVolume }}人已购买</view>
			</view>
			<view class="font-size-extra-lg mb-10">{{ detail.name }}</view>
			<view class="font-size-sm text-color-assist">{{ detail.subName }}</view>
		</view>
		<view class="p-30 bg-white mb-20 font-size-sm">
			<view class="mb-40 d-flex">
				<view class="mr-40 text-color-assist">品牌</view>
				<view>喜茶</view>
			</view>
			<view class="d-flex align-items-center">
				<view class="mr-40 text-color-assist">发货</view>
				<view class="flex-fill d-flex justify-content-between align-items-center">
					<view class="d-flex align-items-center">
						<view>{{ detail.placeOfDispatch }}</view>
						<view class="divider" />
						<view>快递：￥{{ parseFloat(detail.freight / 100) }}</view>
					</view>
					<view class="text-color-assist">预计 {{ detail.daysAfterBuyRange }} 发货</view>
				</view>
			</view>
		</view>
		<view class="p-30 bg-white">
			<view class="mt-30 mb-30 text-center">商品详情</view>
			<jyf-parser :html="detail.describe" ref="article"></jyf-parser>
		</view>
		<view class="footer">
			<view class="grid">
				<view class="item">
					<image src="/static/images/mall/store_brh_home_page_normal.png"></image>
					<view>百货</view>
				</view>
				<view class="item">
					<image src="/static/images/mall/store_brh_service_normal.png"></image>
					<view>客服</view>
				</view>
			</view>
			<view class='btns'>
				<button type="info">加入购物车</button>
				<button type="primary">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser"
	
	export default {
		data() {
			return {
				detail: {
					salePrice: 0,
					itemSalesVolume: 0,
					name: '--',
					subName: '--',
					placeOfDispatch: '--',
					freight: '--',
					daysAfterBuyRange: '--'
				}
			}
		},
		async created() {
			this.detail = await this.$api('martDetail')
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		height: auto;
		padding-bottom: 120rpx;
	}
	
	.materials-swiper {
		height: 750rpx;
	}
	
	.divider {
		width: 1rpx;
		background-color: rgba($color: $border-color, $alpha: 0.6);
		margin: 0 20rpx;
		height: 0.8rem;
	}
	
	.footer {
		height: 120rpx;
		padding: 10rpx 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		z-index: 10;
		
		.grid {
			display: flex;
			align-items: center;			
			font-size: $font-size-sm;
			
			.item {
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				image {
					width: 48rpx;
					height: 48rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		
		.btns {
			display: flex;
			
			button {
				font-size: $font-size-lg;
				padding: 0 40rpx;
				&:nth-child(1) {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
