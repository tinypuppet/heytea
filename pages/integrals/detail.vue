<template>
	<view class="container" v-if="product">
		<image :src="product.http_url + product.image_url" class="w-100" mode="widthFix"></image>
		<view class="header">
			<view class="title">{{ product.name }}</view>
			<view class="subtitle">
				<view class="score">{{ product.score }}</view>
				<view>积分</view>
			</view>
		</view>
		<view class="content">
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">商品类型</view>
					<view class="text">{{ product.type }}</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">有效期限</view>
					<view class="text">自获取之日起{{ product.period_day + product.unit_time }}内有效</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">卡券面额</view>
					<view class="text">{{ product.cut }}</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">卡卷门槛</view>
					<view class="text">{{ product.enough }}</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">可用商品</view>
					<view class="text">全部商品</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">可用门店</view>
					<view class="text">全部门店</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">可用场景</view>
					<view class="text">仅限在喜茶GO小程序下单时，选择“外卖配送”后可用</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">礼品说明</view>
					<view class="text">{{ product.content_text }}</view>
				</view>
			</list-cell>
			<list-cell :padding="padding" :hover="false" last>
				<view class="row">
					<view class="label">礼品介绍</view>
					<view class="text">{{ product.remark }}</view>
				</view>
			</list-cell>
		</view>
		
		<view class="bottom disabled">积分不足</view>
	</view>
</template>

<script>
	import listCell from '../../components/list-cell/list-cell.vue'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				product: null,
				padding: "20rpx"
			}
		},
		async onLoad() {
			//测试
			this.product = await this.$api('productDetail')
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: auto;
		background-color: #FFFFFF;
	}
	
	.header {
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.3);
		
		.title {
			font-size: $font-size-lg;
			margin-bottom: 10rpx;
		}
		.subtitle {
			display: flex;
			align-items: baseline;
			font-size: $font-size-sm;
			color: $text-color-assist;
			.score {
				font-size: $font-size-lg;
				color: $color-primary;
				margin-right: 20rpx;
			}
		}
	}
	
	.content {
		padding-bottom: 100rpx;
		
		.row {
			display: flex;
			align-items: baseline;
			
			.label {
				width: 120rpx;
				font-size: $font-size-medium;
				margin-right: 20rpx;
			}
			
			.text {
				flex: 1;
				font-size: $font-size-sm;
				color: $text-color-assist;
			}		
		}
	}
	
	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $font-size-lg;
		color: $bg-color-white;
		background-color: $color-primary;
		
		&.disabled {
			background-color: #e9d5bb;
		}
	}
</style>
