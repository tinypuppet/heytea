<template>
	<uni-popup ref="popup" type="bottom" @change="change">
		<view class="cart-popup">
			<view class="header">
				<view class="order-type">
					<view class="font-weight-bold">门店订单</view>
					<view class="extra">自提/外送</view>
				</view>
				<view class="d-flex align-items-center" @tap="clear">
					<image src="/static/images/common/delete.png" class="delete-btn"></image>
					<view>清空购物车</view>
				</view>
			</view>
			<scroll-view scroll-y class="content">
				<view class="wrapper">
					<view class="list">
						<view class="item" v-for="(item, index) in cart" :key="index">
							<view class="left">
								<image :src="item.image" mode="widthFix" class="image"></image>
							</view>
							<view class="right">
								<view class="name-and-materials">
									<view class="name">{{ item.name }}</view>
									<view class="materials" v-if="item.materials_text">{{ item.materials_text }}</view>
								</view>
								<view class="price-and-actions">
									<view class="price">￥{{ item.price }}</view>
									<actions :number="item.number" @add="add(item)" @minus="minus(item)"></actions>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import actions from '../actions/actions.vue'

export default {
	components: {
		uniPopup,
		actions
	},
	props: {
		cart: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		open() {
			this.$refs['popup'].open()
		},
		close() {
			this.$refs['popup'].close()
		},
		change({show}) {
			this.$emit('change', show)
		},
		add(item) {
			this.$emit('add', item)
		},
		minus(item) {
			this.$emit('minus', item)
		},
		clear() {
			uni.showModal({
			    content: '清空购物袋',
				confirmColor: '#DBA871',
			    success: res => {
			        if (res.confirm) {
						this.$emit('clear')
			        }
			    }
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.cart-popup {
	background-color: $bg-color-white;
	padding-bottom: 100rpx;
}

.header {
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
	font-size: $font-size-sm;
	color: $text-color-assist;

	.order-type {
		display: flex;
		align-items: center;
		font-size: $font-size-sm;
		color: $text-color-base;
		
		.extra {
			margin-right: 10rpx;
			border: 2rpx solid $color-primary;
			font-size: 18rpx;
			padding: 2rpx 10rpx;
			color: $color-primary;
			margin-left: 10rpx;
		}
	}
	
	.delete-btn {
		width: 46rpx;
		height: 46rpx;
		margin-right: 10rpx;
	}
}

.content {
	max-height: calc(100vh - 600rpx);
	
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		
		.item {
			display: flex;
			align-items: stretch;
			padding: 30rpx 0;
			position: relative;
			
			&:after {
				content: ' ';
				position: absolute;
				bottom: 0;
				left: 180rpx;
				right: 0;
				border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			}
			
			.left {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				
				.image {
					width: 180rpx;
				}
			}
			
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: $font-size-medium;
				color: $text-color-base;
				
				.name-and-materials {
					display: flex;
					flex-direction: column;
					margin-bottom: 20rpx;
					
					.name {
						font-weight: bold;
					}
					
					.materials {
						font-size: $font-size-sm;
						color: $text-color-assist;
					}
				}
				
				.price-and-actions {
					display: flex;
					justify-content: space-between;
				
					.price {
						color: $text-color-grey;
					}
				}
			}
		}
	}
}
</style>
