<template>
	<view class="container">
		<view class="header">
			<!-- 搜索栏 begin -->
			<view class="search-box">
				<view class="search-input" @tap="showSearch=true">
					<image src="/static/images/common/search-icon.png" class="search-icon"></image>
					<view>搜索</view>
				</view>
			</view>
			<!-- 搜索栏 end -->
			<view class="center">
				<view class="store">
					<view class="title">
						<image :src="orderType == 'takein' ? 
								'/static/images/common/star_normal.png' : 
								'/static/images/order/order_icon_address.png'"
						 class="left-icon" />
						<!-- 为了测试方便，这里使用静态店铺数据 -->
						<view class="address">{{ orderType == 'takeout' ? address.complete_address : '中心城店' }}</view>
						<image src="/static/images/common/black_arrow_right.png" class="right-icon"></image>
					</view>
					<!-- 外卖&自取switch begin -->
					<view class="buttons">
						<button type="default" class="button" :class="{active: orderType == 'takein'}" plain hover-class="none" @tap="switchOrderType">
							自取
						</button>
						<button type="default" class="button" :class="{active: orderType == 'takeout'}" plain hover-class="none" @tap="switchOrderType">
							外卖
						</button>
					</view>
					<!-- 外卖&自取switch end -->
				</view>
				<view class="location">距离您622m</view>
			</view>
			<!-- 滚动公告栏 begin -->
			<view class="notices">
				<swiper class="swiper" autoplay vertical :interval="3000" :duration="1000" circular>
					<swiper-item v-for="(notice, index) in notices" :key="index">
						<view class="swiper-item">
							<image :src="notice.image" class="image"></image>
							<view class="content">{{ notice.content }}</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="more">
					<text>更多</text>
					<image src="/static/images/common/gray_arrow_down.png" class="down-icon"></image>
				</view>
			</view>
		</view>
		<!-- 滚动公告栏 end -->
		<view class="main">
			<!-- 左侧菜单 begin -->
			<scroll-view scroll-anchoring class="menu-bar" :scroll-top="menuWrapperScrollTop" scroll-y scroll-with-animation>
				<view class="wrapper">
					<view class="menu-item" @tap="handleMenuSelected(category.id)" :class="{active: currentCategoryId == category.id}"
					 v-for="(category, index) in categories" :key="index" :id="`anchor-${category.id}`">
						<image lazy-load :src="category.category_image_url" class="image" mode="widthFix"></image>
						<view class="title">{{ category.name }}</view>
					</view>
				</view>
			</scroll-view>
			<!-- 左侧菜单 end -->
			<!-- 右侧商品列表 begin -->
			<scroll-view scroll-anchoring class="product-section" scroll-y scroll-with-animation :scroll-into-view="scrollToId">
				<view class="wrapper">
					<view id="ads">
						<!-- 广告栏1 begin -->
						<swiper class="ads1" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
							<swiper-item v-for="(ad, index) in ads1" :key="index">
								<image :src="ad" class="w-100" mode="widthFix"></image>
							</swiper-item>
						</swiper>
						<!-- 广告栏1 end -->
						<!-- 广告栏2 begin -->
						<swiper class="ads2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
							<swiper-item v-for="(ad, index) in ads2" :key="index">
								<image :src="ad" class="w-100" mode="widthFix"></image>
							</swiper-item>
						</swiper>
						<!-- 广告栏2 end -->
					</view>
					<!-- 商品 begin -->
					<view class="products-list" v-for="(category, index) in categories" :key="index" :id="`products-${category.id}`">
						<view class="category-name">{{ category.name }}</view>
						<view class="products">
							<view class="product" v-for="(product, key) in category.products" :key="key" 
								@tap="showProductDetailModal(product)">
								<image lazy-load :src="product.images[0].url" mode="widthFix" class="image"></image>
								<view class="content">
									<view class="name">{{ product.name }}</view>
									<view class="labels">
										<view class="label" 
										:style="{color: label.label_color, background: $util.hexToRgba(label.label_color, 0.2)}"
										 v-for="label in product.labels" :key="label.id">{{ label.name }}</view>
									</view>
									<view class="description">{{ product.description }}</view>
									<view class="price">
										<view>￥{{ product.price }}</view>
										<actions :materials-btn="!product.is_single" 
												@materials="showProductDetailModal(product)" 
												:number="productCartNum(product.id)"
												@add="handleAddToCart(product)" 
												@minus="handleMinusFromCart(product)" />
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 商品 end -->
				</view>
			</scroll-view>
			<!-- 右侧商品列表 end -->
		</view>
		<!-- 商品详情 modal begin -->
		<product-modal :product="product" 
						:visible="productModalVisible" 
						@cancel="closeProductDetailModal" 
						@add-to-cart="handleAddToCartInModal" 
		/>
		<!-- 商品详情 modal end -->
		<!-- 购物车栏 begin -->
		<cart-bar :cart="cart" 
				  @add="handleAddToCart" 
				  @minus="handleMinusFromCart"
				  @clear="clearCart"
				  @pay="pay"
		/>
		<!-- 购物车栏 end -->
		<search :show="showSearch" :categories="categories" @hide="showSearch=false" @choose="showProductDetailModal"></search>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Actions from './components/actions/actions.vue'
	import CartBar from './components/cartbar/cartbar.vue'
	import ProductModal from './components/product-modal/product-modal.vue'
	import cartPopup from './components/cart-popup/cart-popup.vue'
	import Search from './components/search/search.vue'
	
	export default {
		components: {
			Actions,
			CartBar,
			ProductModal,
			cartPopup,
			Search
		},
		data() {
			return {
				scrollToId: 'abc',
				categories: [],
				cart: [],
				product: {},
				currentCategoryId: 0,
				notices: [],
				ads1: [
					"https://go.cdn.heytea.com/storage/ad/2020/05/28/752a5519e89541bd8417614c599cf8c3.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/24/38b7f686cf10449c85b0f5489d5d958e.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/2315beb5105944e8b795c5c0084ec99f.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/b88c6780a73249b0b0166784917a5046.jpg"
				],
				ads2: [
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/acfc6504f3074cf6b730f516adc558f6.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/26/2373600789c64752b2415293877ead40.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/22/515df8c726e740089ae4c55582b4ce09.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/14/d0e51cb22c0a437293c0e6a879b59c7d.jpg"
				],
				productModalVisible: false,
				cartPopupShow: false,
				showSearch: false,
				menuWrapperScrollTop: 0
			}
		},
		computed: {
			...mapState(['orderType', 'address']),
			productCartNum() { //计算单个饮品添加到购物车的数量
				return id => this.cart.reduce((acc, cur) => {
					if (cur.id === id) {
						return acc += cur.number
					}
					return acc
				}, 0)
			}
		},
		async onLoad() {
			this.notices = await this.$api('notices')
			this.categories = await this.$api('categories')
			this.currentCategoryId = this.categories.length && this.categories[0].id
			this.$nextTick(() => {this.calcSize()})
		},
		mounted() {
			const queryMenu = uni.createSelectorQuery().in(this)
			queryMenu.select('.menu-bar').boundingClientRect(data => {
				this.viewportSize = data.height
			}).exec()
		},
		onHide() {
			this.scrollTimer && clearTimeout(this.scrollTimer)
		},
		methods: {
			...mapMutations(['SET_ORDER_TYPE']),
			switchOrderType() {
				if (this.orderType === 'takein') {
					uni.navigateTo({
						url: '/pages/addresses/addresses'
					})
				} else {
					this.SET_ORDER_TYPE('takein')
				}
			},
			handleAddToCart(product) { //添加到购物车
				const index = this.cart.findIndex(item => {
					if (!product.is_single) {
						return (item.id == product.id) && (item.materials_text == product.materials_text)
					} else {
						return item.id === product.id
					}
				})

				if (index > -1) {
					this.cart[index].number += (product.number || 1)
					return
				}

				this.cart.push({
					id: product.id,
					cate_id: product.category_id,
					name: product.name,
					price: product.price,
					number: product.number || 1,
					image: product.images[0].url,
					is_single: product.is_single,
					materials_text: product.materials_text || ''
				})
			},
			handleMinusFromCart(product) { //从购物车减商品
				let index
				if (product.is_single) {
					index = this.cart.findIndex(item => item.id == product.id)
				} else {
					index = this.cart.findIndex(item => (item.id == product.id) && (item.materials_text == product.materials_text))
				}
				this.cart[index].number -= 1
				if (this.cart[index].number <= 0) {
					this.cart.splice(index, 1)
				}
			},
			showProductDetailModal(product) {
				this.product = product
				this.productModalVisible = true
			},
			handleAddToCartInModal(product) {
				this.handleAddToCart(product)
				this.closeProductDetailModal()
			},
			closeProductDetailModal() {
				this.productModalVisible = false
				this.product = {}
			},
			openCartDetailsPopup() {
				this.$refs['cartPopup'].open()
			},
			clearCart() {
				this.cart = []
			},
			handleMenuSelected(id) {
				this._calculateScrollMenuTop(id)
				if (this.scrollToId == `products-${id}`) {
					this.scrollToId = ''
				}
				this.$nextTick(() => {
					this.scrollToId = `products-${id}`
					this.currentCategoryId = id
				})
			},
			_calculateScrollMenuTop(id) {
				if (!this.viewportSize || !this.scrollerSize) return
				if (this.scrollToId == `products-${id}`) return
				const minTranslate = Math.min(0, this.viewportSize - this.scrollerSize)
				const middleTranslate = this.viewportSize / 2
				const ArchItemHeight = 72
				
				let currentArchor = this.categories.find(item => item.id === id)
				let size = currentArchor.menuItemTop + ArchItemHeight / 2 || 0
				let translate = middleTranslate - size
				
				translate = Math.max(minTranslate, Math.min(0, translate))
				this.menuWrapperScrollTop = translate < 0 ? Math.abs(translate) : translate
			},
			calcSize() {
				let h = 0
				let view = uni.createSelectorQuery().select('#ads')
				view.fields({
					size: true
				}, data => {
					h += Math.floor(data.height)
				}).exec()

				this.categories.forEach((item, index) => {
					let view = uni.createSelectorQuery().select(`#products-${item.id}`)  // 获取右侧商品列表节点
					let viewMenu = uni.createSelectorQuery().select(`#anchor-${item.id}`) // 获取左侧menubar节点

					view.fields({
						size: true
					}, data => {
						item.top = h
						h += Math.floor(data.height)
						item.bottom = h
					}).exec()

					viewMenu.boundingClientRect(data => {
						item.menuItemTop = data.top
						if (index > 0) {
							item.menuItemTop = data.top - this.categories[0].menuItemTop
						}
						if (index === this.categories.length - 1) {
							this.scrollerSize = data.bottom - this.categories[0].menuItemTop
							this.categories[0].menuItemTop = 0
						}
					}).exec()
					
					this.useObserverWatcher(item.id)
				})
			},
			/**
			 * ------------------------------------------------------
			 * 监听商品列表分类的相交状态
			 * @param {String} id 选择器id
			 * @pubic
			 * @return void  
			 * -------------------------------------------------------
			 * */
			useObserverWatcher(id) {
				const Observer = uni.createIntersectionObserver(this)
				const thresholds = 1
				
				Observer.relativeTo('.product-section', {
					bottom: thresholds - this.viewportSize      // hack(直接设置成 -viewportSize不行，结果未知)
				}).observe(`#products-${id}`, (res) => {
					if (res.intersectionRatio > 0) {
						
						// debounce scroll linkage
						if (this.scrollTimer) {
							clearTimeout(this.scrollTimer)
						}
						this.scrollTimer = setTimeout(() => {
							this._calculateScrollMenuTop(id)
							this.currentCategoryId = id
						}, 250)
					}
				})
			},
			pay() {
				uni.setStorageSync('cart', this.cart)
				uni.navigateTo({
					url: '/pages/pay/pay'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
