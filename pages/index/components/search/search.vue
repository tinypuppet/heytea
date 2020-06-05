<template>
	<uni-transition :mode-class="['slide-left']" :styles="tranStyles" :show="show">
		<view class="d-flex flex-column overflow-hidden">
			<view class="search-box">
				<view class="search-input">
					<image src="/static/images/common/search-icon.png" class="search-icon"></image>
					<input type="text" v-model="keyword" 
							placeholder="搜个芝字试试看" 
							placeholder-class="placeholder" @input="handleKeywordInput">
				    <image v-if="keyword" src="/static/images/common/image-delete.png" class="close-icon" @tap="clear" />
				</view>
				<view class="ml-30" @tap="hide">取消</view>
			</view>
			<scroll-view class="result" scroll-y>
				<template v-if="!result.length">
					<view class="section">
						<view class="header">
							<view class="title">历史搜索</view>
							<view class="subtitle">
								<image src="/static/images/common/delete.png"></image>
								<view>清除</view>
							</view>
						</view>
						<view class="list">
							<view class="item" v-for="(item, index) in historySearch" :key="index" @tap="handleChoose(item)">
								{{ item.productName }}
							</view>
						</view>
					</view>
					<view class="section">
						<view class="header">
							<view class="title">热门推荐</view>
						</view>
						<view class="list">
							<view class="item" v-for="(item, index) in hotSearch" :key="index" @tap="handleChoose(item)">
								<view class="name">{{ item.productName }}</view>
								<image v-if="item.nameImage" :src="item.nameImage" class="name-image"></image>
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="wrapper" style="padding: 0 30rpx 30rpx 0;">
						<view class="product" v-for="(item, index) in result" :key="index" @tap="handleChoose(item, true)">
							<view class="d-flex align-items-center">
								<image :src="item.images[0].url" class="pro-image"/>
								<view class="pro-name">{{ item.name }}</view>
							</view>
							<view class="pro-price">￥{{ item.price }}</view>
						</view>
					</view>
				</template>
			</scroll-view>
			</view>
		</view>
	</uni-transition>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	export default {
		name: 'Search',
		components: {
			uniTransition
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			categories: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				tranStyles: {
					width: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					backgroundColor: '#fff',
					zIndex: 998
				},
				hotSearch: [],
				historySearch: [],
				keyword: '',
				result: []
			}
		},
		async created() {
			this.hotSearch = await this.$api('hotSearch')
			this.historySearch = await this.$api('historySearch')
		},
		methods: {
			hide() {
				this.keyword = ''
				this.result = []
				this.$emit('hide')
			},
			handleChoose(item, isSearch = false) {
				if(isSearch) {
					this.hide()
					this.$emit('choose', item)
					return
				}
				this.categories.forEach(category => {
					const find = category.products.find(product => product.id == item.productId)
					if(find) {
						this.hide()
						this.$emit('choose', find)
						return
					}
				})
			},
			handleKeywordInput(e) {
				//为了方便，这里使用商品列表的数据来筛选结果
				const {value} = e.detail
				
				if(!value) {
					this.result = []
					return
				}
				
				let result = []
				this.categories.forEach(category => {
					category.products.forEach(product => {
						if(product.name.indexOf(value) > -1) {
							result.push(product)
						}
					})
				})
				setTimeout(() => this.result = result, 300)
			},
			clear() {
				this.keyword=''
				this.result = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		height: 100rpx;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
		
		.search-input {
			flex: 1;
			height: 60rpx;
			padding: 10rpx 20rpx;
			background-color: #f7f7f7;
			font-size: $font-size-base;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;

			.search-icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			
			input {
				flex: 1;
			}
			
			.close-icon {
				width: 30rpx;
				height: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
	
	.section {
		padding: 30rpx;
		
		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			.title {
				font-size: $font-size-medium;
				color: $text-color-base;
			}
			
			.subtitle {
				display: flex;
				align-items: center;
				font-size: $font-size-sm;
				color: $text-color-assist;
				
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		
		.list {
			display: flex;
			flex-wrap: wrap;
			
			.item {
				background-color: #f5f5f7;
				padding: 10rpx 20rpx;
				font-size: $font-size-sm;
				color: $text-color-grey;
				border-radius: 50rem !important;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.name-image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
	
	.result {
		height: calc(100vh - 120rpx);
		/* #ifdef H5 */
		height: calc(100vh - 120rpx - 100rpx);
		/* #endif */
		overflow: hidden;
		
		.product {
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: $font-size-base;
			
			.pro-image {
				width: 144rpx;
				height: 108rpx;
			}
			
			.pro-price {
				font-weight: 500 !important;
			}
		}
	}
</style>
