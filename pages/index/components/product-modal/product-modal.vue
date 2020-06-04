<template>
	<modal :show="visible" custom padding="0" width="90%" radius="18rpx">
		<view class="header">
			<image src="/static/images/index/menupopup_btn_share_normal.png"></image>
			<image src="/static/images/index/round_close_btn.png" @tap="$emit('cancel')"></image>
		</view>
		<swiper :duration="1000" indicator-dots class="swiper" autoplay :interval="3000">
			<swiper-item v-for="(image, index) in productData.images" :key="index" class="swiper-item">
				<image :src="image.url" class="w-100 h-100"></image>
			</swiper-item>
		</swiper>
		<scroll-view scroll-y class="content">
			<view class="wrapper">
				<view class="title">{{ productData.name }}</view>
				<view class="labels">
					<view class="label" v-for="(label, index) in productData.labels" :key="index" 
						:style="{color: label.label_color, background: $util.hexToRgba(label.label_color, 0.2)}">
						{{ label.name }}
					</view>
				</view>
				<view class="mb-10">产品描述</view>
				<view class="mb-20">{{ productData.description }}</view>
				<view class="materials" v-for="(material, index) in productData.materials" :key="index">
					<view class="group-name">{{ material.group_name }}</view>
					<view class="values">
						<view class="value" :class="{selected: value.is_selected}" @tap="changeMaterialSelected(index, key)"
							  v-for="(value, key) in material.values" :key="key">
							{{ value.name }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="bottom" :style="{height: !productData.is_single ? '250rpx' : '200rpx'}">
			<view class="d-flex align-items-center">
				<view class="price-and-materials">
					<view class="price">￥{{ productData.price }}</view>
					<view class="materials" v-show="getProductSelectedMaterials">{{ getProductSelectedMaterials }}</view>
				</view>
				<actions :number="productData.number" @add="add" @minus="minus"></actions>
			</view>
			<button type="primary" class="add-cart-btn" @tap="addToCart">加入购物袋</button>
		</view>
	</modal>
</template>

<script>
	import Modal from '@/components/modal/modal.vue'
	import Actions from '../actions/actions.vue'
	
	export default {
		name: 'ProductModal',
		components: {
			Modal,
			Actions
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			product: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				productData: {}
			}
		},
		watch: {
			product(val) {
				this.productData = JSON.parse(JSON.stringify(val))
				this.$set(this.productData, 'number', 1)
			}
		},
		computed: {
			getProductSelectedMaterials() {
				if(!this.productData.is_single && this.productData.materials) {
					let materials = []
					this.productData.materials.forEach(({values}) => {
						values.forEach(value => {
							if(value.is_selected) {
								materials.push(value.name)
							}
						})
					})
					return materials.length ? materials.join('，') : ''
				}
				return ''
			}
		},
		methods: {
			changeMaterialSelected(index, key) {
				const currentMaterial = this.productData.materials[index].values[key]
				if(!currentMaterial.is_exclusive) {
					if(currentMaterial.is_selected) return
					this.productData.materials[index].values.forEach(value => this.$set(value, 'is_selected', 0))
					currentMaterial.is_selected = 1
					this.productData.number = 1
				} else {
					currentMaterial.is_selected = !currentMaterial.is_selected
					this.productData.number = 1
				}
			},
			add() {
				this.productData.number += 1
			},
			minus() {
				if(this.productData.number == 1) {
					return
				}
				this.productData.number -= 1
			},
			addToCart() {
				const product = {...this.productData, 'materials_text': this.getProductSelectedMaterials}
				this.$emit('add-to-cart', product)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding: 20rpx 30rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		z-index: 11;
		
		image {
			width: 60rpx;
			height: 60rpx;
			
			&:nth-child(1) {
				margin-right: 30rpx;
			}
		}
	}
	
	.swiper {
		height: 426rpx;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		font-size: $font-size-sm;
		color: $text-color-assist;
		min-height: 1vh;
		max-height: calc(100vh - 100rpx - 426rpx - 250rpx);
		
		.wrapper {
			width: 100%;
			height: 100%;
			overflow: hidden;
			padding: 30rpx 30rpx 20rpx;
		}
		
		.title {
			font-size: $font-size-extra-lg;
			color: $text-color-base;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		
		.labels {
			display: flex;
			font-size: 20rpx;
			margin-bottom: 10rpx;
			overflow: hidden;
			flex-wrap: wrap;
			
			.label {
				max-width: 40%;
				padding: 6rpx 10rpx;
				margin-right: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
		.materials {
			width: 80%;
			margin-bottom: 20rpx;
			
			.group-name {
				padding: 10rpx 0;
			}
			
			.values {
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;
				
				.value {
					background-color: #f5f5f7;
					color: $font-size-base;
					padding: 10rpx 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					border-radius: $border-radius-lg;
					
					&.selected {
						background-color: $color-primary;
						color: $bg-color-white;
					}
				}
			}
		}
	}
	
	.bottom {
		padding: 20rpx 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-top: 1rpx solid rgba($color: $border-color, $alpha: 0.3);
		background-color: $bg-color-white;
		position: relative;
		z-index: 11;
		
		.price-and-materials {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			margin-right: 10rpx;
			
			.price {
				color: $color-primary;
				font-size: $font-size-extra-lg;
				font-weight: bold;
			}
			
			.materials {
				font-size: $font-size-sm;
				color: $text-color-assist;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
		
		.add-cart-btn {
			margin-top: 20rpx;
			font-size: $font-size-lg;
			border-radius: $border-radius-base;
		}
	}
</style>
