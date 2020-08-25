<template>
	<view class="container">
		<image class="w-100" src="https://go.cdn.heytea.com/storage/products/2019/12/18/01954797f3fb470cb6ba1606476c658c.png" mode="widthFix"></image>
		<view class="content">
			<view class="welcome" @tap="openLoginPopup">
				<view>你好 {{ isLogin ? userInfo.nickName : '立即登录开启喜茶星球之旅' }}</view>
				<view class="font-size-base">灵感之茶，中国制造</view>
			</view>
			<!-- member card begin -->
			<view class="member-card">
				<view class="info">
					<view class="title">
						<view class="wenyue-font" @tap="openBenefits">GO会员</view>
						<view class="tips" @tap="openMember">
							<view>成为星球会员享双倍积分</view>
							<image src="/static/images/my/icon_arrow.png"></image>
						</view>
					</view>
					<image @tap="info" src="https://wx.qlogo.cn/mmopen/vi_32/Hx7MFkCEmZVHziaTTiaHSiaCs4ApnH5CD0nYOhOg1nYUUMYtxMXkL6L4VL5icRfO5w4LGzW5ib0FZicwj2MficyYfZgCw/132" class="avatar"></image>
					<view class="badage">
						Lv1
					</view>
				</view>
				<view class="row">
					<navigator class="grid" open-type="navigate" url="/pages/integrals/mall">
						<image src="/static/images/my/me_icon_points.png"></image>
						<view class="value">63</view>
						<view class="title">积分商城</view>
					</navigator>
					<view class="grid" hover-class="opacity-6">
						<image src="/static/images/my/me_icon_quan.png"></image>
						<view class="value">0</view>
						<view class="title">喜茶劵</view>
					</view>
					<navigator class="grid" open-type="navigate" url="/pages/my/wallet">
						<image src="/static/images/my/me_icon_wallet.png"></image>
						<view class="value">0.00</view>
						<view class="title">钱包</view>
					</navigator>
					<navigator class="grid" open-type="navigate" url="/pages/gifts/gifts">
						<image src="/static/images/my/me_icon_gift_card.png"></image>
						<view class="value">0</view>
						<view class="title">阿喜有礼</view>
					</navigator>
				</view>
			</view>
			<!-- member card end -->
			<!-- 星球播报 begin -->
			<view class="xinqiubobao">
				<view class="title">星球播报</view>
				<swiper class="swiper" next-margin="50px" autoplay :interval="5000" :duration="500" circular>
					<swiper-item class="swiper-item" v-for="(item, index) in boardcast" :key="index">
						<view class="swiper-item-wrapper">
							<image :src="item.coverPic" class="img"></image>
							<view class="desc">
								<view class="title">{{ item.title }}</view>
								<view class="subtitle">{{ item.subtitle }}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 星球播报 end -->
			<!-- 任务中心 begin -->
			<view class="task-center" @tap="taskCenter">
				<view class="intro">
					<view class="title">任务中心</view>
					<view class="subtitle">MISSION CENTER</view>
				</view>
				<view class="image-wrapper">
					<image src="/static/images/my/b3d3a98e3c7f450aaa32fbec6aecdfaf.png"></image>
				</view>
			</view>
			<!-- 任务中心 end -->
		</view>
		<!-- 开通礼包 begin -->
		<view class="open-gift">
			<view class="header">
				<view class="title">开通礼包</view>
				<view class="subtitle" @tap="openMember">更多</view>
			</view>
			<view class="row">
				<view class="grid" @tap="openMember">
					<image src="/static/images/my/member_benefits/me_rights_icon_free.png"></image>
					<view class="title">
						<view>星球赠饮券</view>
						<view class="number">x1</view>
					</view>
				</view>
				<view class="grid" @tap="openMember">
					<image src="/static/images/my/member_benefits/me_rights_icon_1jia1.png"></image>
					<view class="title">
						<view>买一赠一券</view>
						<view class="number">x1</view>
					</view>
				</view>
				<view class="grid" @tap="openMember">
					<image src="/static/images/my/member_benefits/me_rights_icon_2jia1.png"></image>
					<view class="title">
						<view>买二赠一券</view>
						<view class="number">x2</view>
					</view>
				</view>
				<view class="grid" @tap="openMember">
					<image src="/static/images/my/member_benefits/me_rights_icon_qingshi.png"></image>
					<view class="title">
						<view>喜茶轻食券</view>
						<view class="number">x2</view>
					</view>
				</view>
				<view class="grid" @tap="openMember">
					<image src="/static/images/my/member_benefits/me_rights_icon_youxian_new.png"></image>
					<view class="title">
						<view>优先券</view>
						<view class="number">x2</view>
					</view>
				</view>
				<view class="grid" @tap="openMember">
					<image src="/static/images/my/member_benefits/me_rights_icon_waimai_new.png"></image>
					<view class="title">
						<view>免运费券</view>
						<view class="number">x2</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 开通礼包 end -->
		
		<list-cell hover arrow @click="myCode">
			<view class="list-cell-wrapper">
				<view view="title">会员码</view>
				<view class="subtitle">门店扫码积分、喜茶钱包和阿喜有礼卡支持</view>
			</view>
		</list-cell>
		<list-cell hover arrow>
			<view class="list-cell-wrapper">
				<view view="title">兑换中心</view>
				<view class="subtitle">兑换星球会员、喜茶券和阿喜有礼卡</view>
			</view>
		</list-cell>
		<list-cell hover arrow>
			<view class="list-cell-wrapper">
				<view view="title">星球封面</view>
			</view>
		</list-cell>
		<list-cell hover arrow>
			<view class="list-cell-wrapper">
				<view view="title">联系客服</view>
			</view>
		</list-cell>
		<list-cell hover arrow>
			<view class="list-cell-wrapper">
				<view view="title">消息中心</view>
			</view>
		</list-cell>
		<list-cell hover arrow last>
			<view class="list-cell-wrapper">
				<view view="title">更多</view>
			</view>
		</list-cell>
		<!-- 登录popup -->
		<login-popup ref="loginPopup"></login-popup>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	import loginPopup from './components/login-popup.vue'
	import { mapState } from 'vuex'
	
	export default {
		components: {
			listCell,
			loginPopup
		},
		data() {
			return {
				boardcast: []
			}
		},
		computed: {
			...mapState(['isLogin', 'userInfo'])
		},
		async onLoad() {
			this.boardcast = await this.$api('boardcast')
		},
		methods: {
			openLoginPopup() {
				if(this.isLogin) {
					return
				}
				this.$refs['loginPopup'].open()
			},
			info() {
				uni.navigateTo({
					url: '/pages/my/info'
				})
			},
			taskCenter() {
				uni.navigateTo({
					url: '/pages/task-center/task-center'
				})
			},
			openMember() {
				uni.navigateTo({
					url: '/pages/my/member'
				})
			},
			myCode() {
				uni.navigateTo({
					url: '/pages/my/code'
				})
			},
			openBenefits() {
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/my/benefits'
					})
				} else {
					this.$refs['loginPopup'].open()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
page {
	height: auto;
	min-height: 100%;
}
/* #endif */

.content {
	padding: 0 30rpx;
}

.welcome {
	position: relative;
	margin-top: -136rpx;
	display: flex;
	flex-direction: column;
	font-size: $font-size-lg;
	color: $text-color-warning;
}

.member-card {
	background-color: $bg-color-white;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	border-radius: $border-radius-base;
	margin-bottom: 40rpx;
	
	.info {
		position: relative;
		margin-top: -50rpx;
		display: flex;
		align-items: center;
		position: relative;
		padding: 20rpx 0;
		border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.3);
		
		.title {
			flex: 1;
			font-size: 40rpx;
			color: $text-color-base;
			display: flex;
			align-items: center;
		
			.tips {
				margin-left: 10rpx;
				font-size: $font-size-sm;
				color: $text-color-assist;
				background-color: #e9e9e9;
				padding: 10rpx 30rpx;
				border-radius: 50rem !important;
				display: flex;
				align-items: center;
				
				image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
		
		.avatar {
			width: 150rpx;
			height: 150rpx;
			border-radius: 100%;
		}
		
		.badage {
			font-family: 'neutra';
			position: absolute;
			bottom: 20rpx;
			left: 0;
			border: 2rpx solid $text-color-base;
			padding: 2rpx 20rpx;
			border-radius: $border-radius-lg;
			font-size: $font-size-base;
		}
	}
	
	.row {
		margin-top: $spacing-row-base;
		width: 100%;
		display: flex;
		align-items: center;

		.grid {
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			image {
				width: 100rpx;
				height: 100rpx;
			}
			
			.value {
				font-family: 'neutra';
				margin-bottom: $spacing-col-sm;
				font-size: $font-size-lg;
			}
			
			.title {
				font-size: $font-size-sm;
				color: $text-color-grey;
			}
		}
	}
}

.xinqiubobao {
	width: 100%;
	position: relative;
	
	.title {
		margin: 10rpx 0;
		font-size: $font-size-lg;
		font-weight: 500;
	}
	
	.swiper {
		height: 200rpx;
		margin-bottom: 10rpx;
		
		.swiper-item {
			
			.swiper-item-wrapper {
				display: flex;
				background-color: $bg-color-white;
				padding: 40rpx 60rpx;
				border-radius: $border-radius-base;
				align-items: center;
				margin-right: 40rpx;
				
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
					margin-right: 20rpx;
				}
				
				.desc {
					display: flex;
					flex-direction: column;
					
					.title {
						font-size: $font-size-medium;
						font-weight: 500;
						margin-bottom: 10rpx;
					}
					
					.desc {
						font-size: $font-size-sm;
						color: $text-color-grey;
					}
				}
			}
		}
	}
}

.task-center {
	margin: 40rpx 0;
	background-color: $bg-color-white;
	padding: 10rpx 0;
	display: flex;
	align-items: center;
	border-radius: $border-radius-lg;
	
	.intro {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.title {
			font-size: $font-size-lg;
			color: $text-color-base;
		}
		.subtitle {
			font-family: 'neutra';
			font-size: $font-size-sm;
		}
	}
	
	.image-wrapper {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image {
			width: 200rpx;
			height: 200rpx;
		}
	}
}

.open-gift {
	width: 100%;
	background-color: $bg-color-white;
	padding: 30rpx 40rpx;
	margin-bottom: 20rpx;
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		
		.title {
			font-size: $font-size-lg;
			font-weight: 500;
		}
		
		.subtitle {
			font-size: $font-size-base;
			color: $text-color-grey;
		}
	}
	
	.row {
		display: flex;
		flex-wrap: wrap;
		
		.grid {
			width: 33.3333%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			
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
				
				.number {
					margin-left: 5rpx;
					font-family: 'neutra';
					color: $color-warning;
				}
			}
		}
	}
}

.list-cell-wrapper {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.title {
		font-size: $font-size-lg;
	}
	
	.subtitle {
		font-size: $font-size-sm;
		color: $text-color-assist;
	}
}
</style>
