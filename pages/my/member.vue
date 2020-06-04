<template>
	<view class="container">
		<view class="header">
			<image src="https://static.heytea.com/weapp/images/member/me_kaitong_img_card.png" class="card-img" mode="widthFix"></image>
			<view class="tips">付费购买星球会员卡享12个月星球会员权益</view>
		</view>
		<!-- 开通礼包 begin -->
		<view class="card">
			<view class="card-title">
				<view class="title">开通礼包</view>
				<view class="subtitle">开通/续费星球会员后，立即发放</view>
			</view>
			<view class="grids">
				<view class="grid">
					<image src="/static/images/my/member_benefits/me_rights_icon_free.png"></image>
					<view class="title">
						<view>星球赠饮券</view>
						<view class="number">x1</view>
					</view>
				</view>
				<view class="grid">
					<image src="/static/images/my/member_benefits/me_rights_icon_1jia1.png"></image>
					<view class="title">
						<view>买一赠一券</view>
						<view class="number">x1</view>
					</view>
				</view>
				<view class="grid">
					<image src="/static/images/my/member_benefits/me_rights_icon_2jia1.png"></image>
					<view class="title">
						<view>买二赠一券</view>
						<view class="number">x2</view>
					</view>
				</view>
				<view class="grid">
					<image src="/static/images/my/member_benefits/me_rights_icon_qingshi.png"></image>
					<view class="title">
						<view>喜茶轻食券</view>
						<view class="number">x2</view>
					</view>
				</view>
				<view class="grid">
					<image src="/static/images/my/member_benefits/me_rights_icon_youxian_new.png"></image>
					<view class="title">
						<view>优先券</view>
						<view class="number">x2</view>
						<view class="badge danger">免排队</view>
					</view>
				</view>
				<view class="grid">
					<image src="/static/images/my/member_benefits/me_rights_icon_waimai_new.png"></image>
					<view class="title">
						<view>免运费券</view>
						<view class="number">x2</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 开通礼包 end -->
		<!-- 每月等级权益 begin -->
		<view class="card">
			<view class="card-title">
				<view class="title">每月等级权益</view>
				<view class="subtitle">根据购买日期，每月同一时间发放</view>
			</view>
			<view class="card-body">
				<view class="row">
					<view class="title">优先券</view>
					<view class="subtitle">x1/月</view>
				</view>
				<view class="row">
					<view class="title">满35减3劵</view>
					<view class="subtitle">x1/月</view>
				</view>
				<view class="row">
					<view class="title">满60减5劵</view>
					<view class="subtitle">x1/月</view>
				</view>
				<view class="row">
					<view class="title">整单9折</view>
					<view class="subtitle">x1/月</view>
				</view>
				<view class="row">
					<view class="title">
						<view>每月28号会员日消费额外赠送5%积分</view>
						<view class="badge primary">特权</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view>查看其它等级权益</view>
				<image src="/static/images/common/black_arrow_right.png"></image>
			</view>
		</view>
		<!-- 每月等级权益 end -->
		<!-- 星球会员权益 begin -->
		<view class="card">
			<view class="card-title">
				<view class="title">星球会员权益</view>
				<view class="subtitle">星球会员有效期内可使用</view>
			</view>
			<view class="card-body">
				<view class="row">
					<view class="title">
						<view>生日赠饮券</view>
						<view class="badge danger">免排队，优先制作</view>
					</view>
					<view class="subtitle">x1</view>
				</view>
				<view class="row">
					<view class="title">星球会员开通纪念日赠饮劵</view>
					<view class="subtitle">x1</view>
				</view>
				<view class="row">
					<view class="title">5.28会员日赠饮劵</view>
					<view class="subtitle">x1</view>
				</view>
				<view class="row">
					<view class="title">
						<view>积分经验值涨速翻倍</view>
						<view class="badge primary">特权</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 星球会员权益 end -->
		<view class="footer">
			<view class="agreement">
				<checkbox :checked="agree" color="#DBA871"/>
				<view>同意<text class="text-color-primary">《喜茶星球(付费)会员服务协议》</text></view>
			</view>
			<view class="bottom">
				<view class="font-size-lg font-weight-bold ml-30">
					总价：<text class="text-color-primary">179/12月</text>
				</view>
				<button type="primary">去支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree: false
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	height: auto;
	padding-bottom: 200rpx;
}

.header {
	width: 100%;
	background-color: #f6f6f6;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx 0 0;
	
	.card-img {
		width: 575rpx;
		box-shadow: 0 10rpx 10rpx 0 rgba($color: #e3e3e3, $alpha: 0.6);
	}
	
	.tips {
		font-size: $font-size-sm;
		color: $color-primary;
		padding: 30rpx 0;
	}
}

.card-title {
	display: flex;
	align-items: baseline;
	margin-bottom: 20rpx;
	
	.title {
		font-family: 'wenyue';
		font-size: $font-size-lg;
		font-weight: 500;
	}
	
	.subtitle {
		margin-left: 20rpx;
		font-size: $font-size-base;
		color: $text-color-assist;
	}
}

.card {
	width: 100%;
	background-color: $bg-color-white;
	padding: 30rpx 40rpx;
	margin-bottom: 20rpx;
	
	.grids {
		display: flex;
		flex-wrap: wrap;
		
		.grid {
			width: 33.3333%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			position: relative;
			
			image {
				width: 70rpx;
				height: 70rpx;
				margin-bottom: $spacing-row-base;
			}
			
			.title {
				font-size: $font-size-base;
				color: $text-color-base;
				display: flex;
				align-items: baseline;
				
				.badge {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
				}
				
				.number {
					margin-left: 5rpx;
					font-family: 'neutra';
					color: $color-warning;
				}
			}
		}
	}
	
	.row {
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		font-size: $font-size-medium;
		
		.title {
			display: flex;
			align-items: center;
			
			.badge {
				position: relative;
				margin-top: -40rpx;
				margin-left: 6rpx;
			}
		}
		
		.subtitle {
			color: $color-primary;
			font-weight: 500;
		}
	}
	
	.footer {
		padding: 20rpx 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: $font-size-sm;
		image {
			width: 30rpx;
			height: 30rpx;
		}
	}
}

.badge {
	color: #FFFFFF;
	font-size: 20rpx;
	line-height: 1rem;
	padding: 0 16rpx;
	border-radius: 50rem 50rem 50rem 0;
	
	&.danger {
		background-color: #d36661;
	}
	
	&.primary {
		background-color: $color-primary;
	}
}

.footer {
	height: 200rpx;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	z-index: 10;
	
	.agreement {
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		font-size: $font-size-sm;
		color: $text-color-assist;
		
		uni-checkbox /deep/.uni-checkbox-input {
			width: 34rpx;
			height: 34rpx;
		}
	}
	
	.bottom {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1rpx solid rgba($color: $border-color, $alpha: 0.8);
		
		button {
			height: 100%;
			font-size: $font-size-lg;
			border-radius: 0 !important;
			line-height: 100rpx;
			padding: 0 100rpx;
		}
	}
}
</style>
