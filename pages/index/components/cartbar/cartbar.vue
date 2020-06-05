<template>
	<view>
		<uni-transition :mode-class="['slide-bottom']" :show="!!cartNum" :styles="cartBarStyles">
			<view class="left">
				<view class="detail-action" @tap="details">
					<image src="/static/images/index/icon_shopping_bag.png" class="shopbag-btn"></image>
					<view class="badge">{{ cartNum }}</view>
				</view>
				<view class="price">￥{{ cartPrice }}</view>
			</view>
			<button type="primary" class="right" @tap="pay">结算</button>
		</uni-transition>
		<cart-popup :cart="cart" ref="cartPopup" @add="add" @minus="minus" @clear="clear"></cart-popup>
	</view>
</template>

<script>
import uniTransition from '@/components/uni-transition/uni-transition.vue'
import cartPopup from '../cart-popup/cart-popup.vue'

export default {
	name: 'CartBar',
	components: {
		uniTransition,
		cartPopup
	},
	props: {
		cart: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		cartNum() { //计算购物车总数
			return this.cart.reduce((acc, cur) => acc + cur.number, 0)
		},
		cartPrice() {	//计算购物车总价
			return this.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0)
		}	
	},
	data() {
		return {
			cartBarStyles: {
				'position': 'fixed',
				'bottom': 0,
				// #ifdef H5
				'bottom': 'var(--window-bottom)',
				// #endif
				'width': '100%',
				'z-index': '995',
				'height': '100rpx',
				'background-color': '#f0f0f1',
				'border-bottom': '2rpx solid #c8c7cc',
				'display': 'flex',
				'justify-content': 'space-between',
				'align-items': 'stretch',
			}
		}
	},
	methods: {
		details() {
			this.$refs['cartPopup'].open()
		},
		add(product) {
			this.$emit('add', {...product, number: 1})
		},
		minus(product) {
			this.$emit('minus', product)
		},
		clear() {
			this.$emit('clear')
		},
		pay() {
			this.$emit('pay')
		}
	},
	watch: {
		cartNum(val) {
			if(!val) {
				this.$refs['cartPopup'].close()
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	align-items: center;

	.detail-action {
		height: 100%;
		border-radius: 100%;
		background-color: #ffffff;
		box-shadow: 0 10rpx 10rpx 0 rgba($color: $border-color, $alpha: 0.2);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 100rpx;
		margin-top: -20rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;

		.shopbag-btn {
			width: 70rpx;
			height: 70rpx;
		}

		.badge {
			background-color: $color-primary;
			font-size: $font-size-sm;
			color: $bg-color-white;
			line-height: 1rem;
			width: 1rem;
			text-align: center;
			border-radius: 100%;
			position: absolute;
			right: 0;
			top: 0;
		}
	}

	.price {
		font-size: $font-size-extra-lg;
		font-weight: bold;
		color: $text-color-base;
	}
}

.right {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 70rpx;
	border-radius: 0 !important;
	font-size: $font-size-extra-lg;
}
</style>
