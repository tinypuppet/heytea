<template>
	<uni-popup ref="popup" type="bottom">
		<view class="card-popup">
			<view class="header">
				<image src="/static/images/common/gift_icon_close_new.png" class="close-btn" @tap="close"></image>
			</view>
			<view class="unit-set">
				<image :src="product.image_url" class="product-img" mode="widthFix"/>
				<view>{{ product.name }}</view>
			</view>
			<view class="content">
				<view class="row sku-list-row">
					<view class="label">选择面额：</view>
					<picker v-if="product.sku_list" mode="selector" 
							:value="selectedSkuIndex" 
							:range="product.sku_list" 
							range-key="card_amount" 
							@change="skuPickerChange">
						<view class="sku-list-picker">
							<view class="price">￥{{ product.sku_list[selectedSkuIndex].card_amount }}</view>
							<image src="/static/images/common/icon-drop-down.png" class="down-icon"/>
						</view>
					</picker>
				</view>
				<view class="row">
					<view class="label">温馨提示：</view>
					<view class="desc">成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请发票】申请预付卡发票</view>
				</view>
				<view class="row">
					<view class="label">购买须知：</view>
					<view class="desc">
						购买即视为阅读并同意
						<navigator hover-class="none" class="tips">《使用须知》</navigator>及
						<navigator hover-class="none" class="tips">《喜茶单用途商业预付卡章程》</navigator>
					</view>
				</view>
			</view>
			<button type="primary" class="submit-btn">
				确认支付￥{{ product.sku_list && product.sku_list[selectedSkuIndex].card_amount }}
			</button>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: 'CardPopup',
		components: {
			uniPopup
		},
		props: {
			product: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				selectedSkuIndex: 0
			}
		},
		methods: {
			open() {
				this.$refs['popup'].open()
			},
			close() {
				this.selectedSkuIndex = 0
				this.$refs['popup'].close()
			},
			skuPickerChange(e) {
				this.selectedSkuIndex = e.target.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-popup {
		padding: 40rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
	}
	
	.header {
		display: flex;
		justify-content: flex-end;
		
		.close-btn {
			width: 48rpx;
			height: 48rpx;
		}
	}
	
	.unit-set {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-size-lg;
		color: $text-color-base;
		margin-bottom: 30rpx;
		
		.product-img {
			width: 536rpx;
			border-radius: $border-radius-lg;
			box-shadow: 0 10rpx 10rpx 0 rgba($color: $border-color, $alpha: 0.6);
			margin-bottom: 30rpx;
		}
	}
	
	.content {
		.row {
			display: flex;
			align-items: baseline;
			margin-bottom: 20rpx;
			
			.label {
				font-size: $font-size-base;
				color: $text-color-base;
				flex-shrink: 0;
			}
			
			.desc {
				font-size: $font-size-sm;
				color: $text-color-assist;
				
				.tips {
					display: inline-block;
					color: $color-primary;
				}
			}
		}
		
		.sku-list-row {
			padding: 10rpx 0;
			border-bottom: 1rpx solid $border-color;
			margin-bottom: 40rpx;
			justify-content: space-between;
			
			.sku-list-picker {
				display: flex;
				align-items: center;
				
				.price {
					font-family: 'neutra';
					font-size: 48rpx;
					color: $text-color-base;
					font-weight: 700 !important;
				}
				
				.down-icon {
					width: 30rpx;
					height: 30rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	
	.submit-btn {
		font-size: $font-size-lg;
		width: 100%;
		margin-top: 50rpx;
	}
</style>
