<template>
	<view class="container">
		<view class="toutu">
			<image src="https://go.cdn.heytea.com/weapp/images/member/storage-value/toutu2.png" class="w-100" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="how-to-use">
				<view class="biaoti-box">
					<image src="https://go.cdn.heytea.com/weapp/images/member/storage-value/biaoti.png" class="biaoti" mode="widthFix"></image>
				</view>
				<view class="article">
					喜茶钱包作为喜茶支付的全新方式，支持喜茶GO小程序和线下门店支付使用。
				</view>
				<view class="d-flex align-items-center">
					<view class="w-40 d-flex flex-column">
						<view class="font-size-extra-lg text-color-base font-weight-bold mb-20">线上支付</view>
						<view>
							<view>小程序下单</view>
							<view>选择喜茶钱包支付</view>
						</view>
					</view>
					<image class="w-60" src="https://go.cdn.heytea.com/weapp/images/member/storage-value/shouji.png" mode="widthFix"></image>
				</view>
				<view class="d-flex align-items-center">
					<image class="w-60" src="https://static.heytea.com/weapp/images/member/xianxiazhifu.png" mode="widthFix"></image>
					<view class="w-40 d-flex flex-column align-items-end">
						<view class="font-size-extra-lg text-color-base font-weight-bold mb-20">线下支付</view>
						<view class="text-right">
							<view>打开会员码</view>
							<view>勾选喜茶钱包支付</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="use-description">
				<view class="biaoti-box">
					<image src="https://go.cdn.heytea.com/weapp/images/member/storage-value/biaoti2.png" class="biaoti" mode="widthFix"></image>
				</view>
				<view class="title">开通喜茶钱包流程</view>
				<view class="d-flex align-items-center justify-content-evenly">
					<image src="https://go.cdn.heytea.com/weapp/images/member/storage-value/shoujihaoma.png" class="mr-40" mode="widthFix"></image>
					<image src="https://go.cdn.heytea.com/weapp/images/member/storage-value/jiaoyimima.png" class="mr-40" mode="widthFix"></image>
					<image src="https://go.cdn.heytea.com/weapp/images/member/storage-value/chongzhijine.png" mode="widthFix"></image>
				</view>
				<view class="title">喜茶钱包如何充值？</view>
				<view class="article">点击“立即充值”，选择要充值的金额后，即可完成充值。</view>
				<view class="title">喜茶钱包是否有限额？</view>
				<view class="article">
					喜茶钱包支持多次但限额的充值，充值后的钱包总额不得超过1000元人民币。当钱包的剩余额度小于即将充值的金额，则无法进行充值。
					<br>
					例：充值600元后，钱包剩余可充值额度为400元，若重复充值600元将出现无法充值的情况，可选值充值小于400元的金额继续进行充值。
				</view>
			</view>
		</view>
		<view class="footer" :class="{'show':footerShow}">
			<view class="agreement" @tap="agree=!agree">
				<image :src="!agree?'/static/images/common/gouxuankuang.png':'/static/images/common/round-black-selected.png'"></image>
				<view>同意《喜茶钱包章程》</view>
			</view>
			<button type="info" :disabled="!agree" @tap="open">开通钱包</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree: false,
				footerShow: false
			}
		},
		onPageScroll({scrollTop}) {
			let top
			// #ifdef H5
			top = 66
			// #endif
			// #ifndef H5
			top = 100
			// #endif
			
			this.footerShow = scrollTop >= top ? true : false
		},
		methods: {
			open() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: $bg-color-white;
}

.container {
	height: auto;
	font-size: $font-size-base;
	color: $text-color-assist;
	line-height: 1.2rem;
	padding-bottom: 200rpx;
}

.toutu {
	padding: 100rpx 30rpx;
}
.content {
	padding: 0 40rpx;
}

.how-to-use {
	margin-bottom: 100rpx;
	
	.article {
		margin-bottom: 60rpx;
	}
}

.biaoti-box {
	padding: 60rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.biaoti {
		width: 320rpx;
	}
}

.use-description {
	.title {
		color: $text-color-base;
		margin: 20rpx 0;
		display: list-item;
		list-style-type: disc;
		list-style-position: inside;
		font-weight: 500;
	}
	
	.article {
		marign: 10rpx 0;
	}
}

.footer {
	z-index: 10;
	background-color: $bg-color-white;
	position: fixed;
	bottom: -200rpx;
	width: 100%;
	height: 200rpx;
	padding: 20rpx 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: $font-size-sm;
	color: $text-color-assist;
	border-top: 1rpx solid rgba($color: $border-color, $alpha: 1.0);
	transition: all 1s cubic-bezier(0, 1, 0.5, 1);
	
	&.show {
		bottom: 0;
	}
	
	.agreement {
		display: flex;
		align-items: center;
		
		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
	
	button {
		font-size: $font-size-lg;
		line-height: 3.2;
	}
}
</style>
