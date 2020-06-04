<template>
	<view
		class="tui-cell-class tui-list-cell"
		:class="{'tui-cell-last': last, 'tui-line-left': lineLeft, 'tui-line-right': lineRight, 'tui-radius': radius }"
		:hover-class="hover ? 'tui-cell-hover' : ''"
		:style="{ background: bgcolor, fontSize: size + 'rpx', color: color, padding: padding}"
		:hover-stay-time="150"
		@tap="handleClick"
	>
		<slot></slot>
		<image src="/static/images/common/icon_jump_black3.png" class="arrow" v-if="arrow"></image>
	</view>
</template>

<script>
export default {
	name: "ListCell",
	props: {
		 //是否有箭头
		arrow: {
			type: Boolean,
			default: false
		},
		//是否有点击效果
		hover: {
			type: Boolean,
			default: false
		},
		lineLeft:{
			type: Boolean,
			default: true
		},
		lineRight:{
			type: Boolean,
			default: false
		},
		padding:{
			type:String,
			default:"30rpx"
		},
		last: {
			type: Boolean,
			default: false //最后一条数据隐藏线条
		},
		radius:{
			type:Boolean,
			default:false
		},
		bgcolor: {
			type: String,
			default: "#fff" //背景颜色
		},
		size: {
			type: Number,
			default: 28 //字体大小
		},
		color: {
			type: String,
			default: "#343434" //字体颜色
		},
		index: {
			type: Number,
			default: 0
		}
	},
	methods: {
		handleClick() {
			this.$emit('click', {
				index: this.index
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.tui-list-cell {
	position: relative;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	align-items: center;
}
.tui-radius {
	border-radius: 12rpx;
	overflow: hidden;
}

.tui-cell-hover {
	background: #f7f7f9 !important;
}

.tui-list-cell::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.3);
	bottom: 0;
	right: 0;
	left: 0;
}

.tui-line-left::after {
	left: 30rpx !important;
}

.tui-line-right::after {
	right: 30rpx !important;
}

.tui-cell-last::after {
	border-bottom: 0 !important;
}

.arrow {
	width: 20rpx;
	height: 32rpx;
	position: relative;
	flex-shrink: 0;
	margin-left: 10rpx;
}
</style>
