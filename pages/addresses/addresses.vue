<template>
	<view class="container">
		<view class="content">
			<list-cell v-for="(address, index) in addresses" :key="index" :line-left="false" @tap="choose(address)">
				<view class="address">
					<view class="info">
						<view class="user-row">
							{{ `${address.name}(${address.gender ? '女士' : '男士'}) ${address.phone}` }}
						</view>
						<view class="address-row">
							<view class="is-default">默认地址</view>
							<view class="address">{{ `${address.address} ${address.description}` }}</view>
						</view>
					</view>
					<image src="/static/images/common/edit.png" @tap.stop="edit(address.id)" class="edit-btn"></image>
				</view>
			</list-cell>
		</view>
		<view class="footer">
			<button type="info" @tap="add">+添加地址</button>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	import {mapState, mapMutations} from 'vuex'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['addresses'])
		},
		methods: {
			...mapMutations(['SET_ADDRESS', 'SET_ORDER_TYPE']),
			add() {
				uni.navigateTo({
					url: '/pages/addresses/add'
				})
			},
			edit(id) {
				uni.navigateTo({
					url: '/pages/addresses/add?id=' + id
				})
			},
			choose(address) {
				this.SET_ADDRESS(address)
				this.SET_ORDER_TYPE('takeout')
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: auto;
		margin-top: 20rpx;
		padding-bottom: 170rpx;
	}
	
	.address {
		width: 100%;
		display: flex;
		align-items: center;
		
		.info {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-right: 20rpx;
			overflow: hidden;
			
			.user-row {
				font-size: $font-size-lg;
				font-weight: 500;
				margin-bottom: 10rpx;
			}
			
			.address-row {
				display: flex;
				align-items: center;
				
				.is-default {
					background-color: #faf5ef;
					font-size: 16rpx;
					color: $color-primary;
					padding: 4rpx;
					flex-shrink: 0;
					margin-right: 6rpx;
				}
				
				.address {
					font-size: $font-size-base;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		
		.edit-btn {
			width: 45rpx;
			height: 45rpx;
			margin-right: 20rpx;
		}
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 10;
		background-color: $bg-color;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150rpx;
		padding: 0 30rpx;
		
		button {
			width: 100%;
			font-size: $font-size-extra-lg;
		}
	}
</style>
