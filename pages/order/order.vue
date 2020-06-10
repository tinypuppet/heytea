<template>
	<view class="container">
		<view class="navbar">
			<button type="default" plain class="talk-btn">
				<image src="/static/images/order/order_icon_talk2.0.png"></image>
				<view>想对你说</view>
			</button>
		</view>
		<view class="tabbar">
			<view class="item" :class="{active: !tabIndex}" @tap="switchTab(0)">当前订单</view>
			<view class="item" :class="{active: tabIndex}" @tap="switchTab(1)">历史订单</view>
		</view>
		<swiper :current="tabIndex" :duration="300" class="swiper" :show-scrollbar="false">
			<!-- 当前订单 begin -->
			<swiper-item @touchmove.stop="handleSwiperItemChange">
				<view class="no-order-content">
					<image src="https://go.cdn.heytea.com/storage/ad/2020/05/20/0bdb360866d94aa4a4404c0b676a1982.jpg"></image>
					<view class="tips">
						<view>您今天还没有下单</view>
						<view>快去选择一杯喜欢的茶吧</view>
					</view>
					<button type="primary" class="font-size-lg" hover-class="none">去下单</button>
				</view>
			</swiper-item>
			<!-- 当前订单 end -->
			<!-- 历史订单 begin -->
			<swiper-item @touchmove.stop="handleSwiperItemChange">
				<view class="history-order">
					<view class="menu">
						<view class="flex-fill d-flex justify-content-start">
							<view class="item" :class="{active: !orderMenuIndex}" @tap="switchMenuTab(0)">门店订单</view>
							<view class="item" :class="{active: orderMenuIndex}" @tap="switchMenuTab(1)">百货订单</view>
						</view>
						<view class="item" v-show="batchInvoiceVisible">
							<image src="/static/images/order/batch_invoice_icon.png"></image>
							<view>批量开票</view>
						</view>
					</view>
					<swiper :current="orderMenuIndex" :duration="300" :show-scrollbar="false" class="history-order-swiper">
						<!-- 门店订单 begin -->
						<swiper-item @touchmove.stop="handleSwiperItemChange">
							<scroll-view scroll-y="true" class="orders-scroll">
								<view class="wrapper">
									<view class="order-list">
										<navigator class="order" v-for="(order, index) in orders" :key="index" open-type="navigate" :url="'/pages/order/detail?id=' + order.id">
											<view class="header">
												<view class="flex-fill font-size-medium">{{ order.shop.name }}</view>
												<view class="status">
													<view>已完成</view>
													<image src="/static/images/common/black_arrow_right.png"></image>
												</view>
											</view>
											<scroll-view scroll-x>
												<view class="images">
													<image :src="item.image" v-for="(item, index) in order.items" :key="index"></image>
												</view>
											</scroll-view>
											<view class="info">
												<view class="left">
													<view>订单编号：{{ order.no }}</view>
													<view>下单时间：{{ order.created_at }}</view>
												</view>
												<view class="right">
													￥{{ order.total_fee }}
												</view>
											</view>
											<view class="action">
												<button type="default" hover-class="none">开发票</button>
												<button type="default" hover-class="none">查看评论</button>
												<button type="primary" plain hover-class="none">再来一单</button>
											</view>
										</navigator>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
						<!-- 门店订单 end -->
						<!-- 百货订单 begin -->
						<swiper-item @touchmove.stop="handleSwiperItemChange">
							<view class="store-order-wrapper">
								<image src="/static/images/order/default_img_order.png"></image>
								<view>您还没有下单</view>
								<view>快去百货商城逛逛吧</view>
							</view>
						</swiper-item>
						<!-- 百货订单 end -->
					</swiper>
				</view>
			</swiper-item>
			<!-- 历史订单 end -->
		</swiper>
		<!-- <image src="https://go.cdn.heytea.com/storage/ad/2020/05/20/1a389117c2fb44d5bcad4a910a68246c.jpg"></image> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 0,
			orderMenuIndex: 0,
			orders: [],
			storeOrders: []
		}
	},
	async onLoad() {
	},
	computed: {
		batchInvoiceVisible() {
			return (!this.orderMenuIndex && this.orders.length) || (this.orderMenuIndex && this.storeOrders.length)
		}
	},
	methods: {
		async switchTab(index) {
			if(this.tabIndex === index) return
			this.tabIndex = index
			if(this.tabIndex) {
				await this.getOrders()
			}
		},
		handleSwiperItemChange() {	//禁止手动滑动
			return true
		},
		async switchMenuTab(index) {
			if(this.orderMenuIndex === index) return
			this.orderMenuIndex = index
			await this.getOrders()
		},
		async getOrders() {
			if(!this.orderMenuIndex) {
				this.orders = await this.$api('orders')
			} else {
				this.storeOrders = await this.$api('storeOrders')
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f6f6f6;
}
.navbar {
	height: calc(44px + var(--status-bar-height));
	/* #ifdef H5 */
	height: 44px;
	/* #endif */
	display: flex;
	background-color: #FFFFFF;
}

.talk-btn {
	height: 32px;
	margin-left: 10px;
	margin-top: 26px;
	/* #ifdef H5 */
	margin-top: 6px;
	/* #endif */
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: $font-size-sm !important;
	padding: 0 20rpx;
	border-radius: 50rem !important;
	
	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: $spacing-row-sm;
	}
}

.tabbar {
	height: 100rpx;
	background-color: $bg-color-white;
	display: flex;
	align-items: center;
	justify-content: space-around;
	
	.item {
		height: 100%;
		font-size: $font-size-lg;
		color: $text-color-assist;
		font-weight: 400 !important;
		display: flex;
		align-items: center;
		
		&.active {
			color: $text-color-base;
			border-bottom: 4rpx solid $text-color-base;
		}
	}
}

.swiper {
	width: 100%;
	height: calc(100vh - 44px - var(--status-bar-height) - 110rpx);
	/* #ifdef H5 */
	height: calc(100vh - 44px - var(--status-bar-height) - 110rpx - 100rpx);
	/* #endif */
}

.no-order-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	image {
		width: 300rpx;
		height: 300rpx;
		margin-bottom: 50rpx;
	}

	.tips {
		color: $text-color-assist;
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1.2rem !important;
		margin-bottom: 70rpx;
	}

	button {
		width: 50%;
	}
}

.history-order {
	width: 100%;
	height: 100%;
	position: relative;
	
	.menu {
		padding: 18rpx 30rpx;
		display: flex;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color-grey;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		
		.item {
			padding: 14rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			
			&.active {
				color: $color-primary;
				background-color: $bg-color-white;
			}
		}
	}
	
	.history-order-swiper {
		width: 100%;
		height: 100%;
	}
}

.store-order-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: $font-size-base;
	color: $text-color-assist;
	line-height: 1.3rem !important;
	
	image {
		width: 400rpx;
		height: 333rpx;
		margin-bottom: 40rpx;
	}
}

.orders-scroll {
	width: 100%;
	height: 100%;
	padding-top: 104rpx;
}

.order-list {
	display: flex;
	width: 100%;
	flex-direction: column;
	
	.order {
		background-color: $bg-color-white;
		padding: 30rpx 40rpx;
		margin-bottom: 18rpx;
		
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.status {
				font-size: $font-size-base;
				color: $text-color-grey;
				display: flex;
				align-items: center;
				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: $spacing-row-sm;
				}
			}
		}
		
		.images {
			display: flex;
			padding: 30rpx 0;
			image {
				flex-shrink: 0;
				width: 150rpx;
				height: 112.5rpx;
			}
		}
		
		.info {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			
			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: $font-size-base;
				color: $text-color-grey;
			}
			
			.right {
				font-size: $font-size-lg;
				color: $text-color-base;
			}
		}
		
		.action {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			
			button {
				margin-left: 30rpx;
				font-size: $font-size-sm;
			}
		}
	}
}
</style>
