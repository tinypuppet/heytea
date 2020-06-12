<template>
	<view class="container">
		<view class="mb-40 font-size-medium">快捷标签</view>
		<view class="remarks">
			<view class="remark" :class="{'active': remark.active}" v-for="(remark, index) in remarks" :key="index" @tap="choose(index)">
				{{ remark.label }}
			</view>
		</view>
		<view class="textarea-box">
			<textarea class="textarea" v-model="remark" placeholder-class="placeholder" :maxlength="50" @input="handleTextareaInput"></textarea>
			<view class="tips">{{ remark.length }} / 50</view>
		</view>
		<button type="info" class="w-100 font-size-extra-lg border-radius-lg" style="margin-top: 50rpx;" @tap="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarks: [
					{label: '打包', active: 0},
					{label: '不打包', active: 0},
					{label: '放在前台', active: 0},
				],
				remark: ''
			}
		},
		onShow() {
			this.remark = this.$store.state.remark
			this.remarks.forEach(item => (item.label == this.remark) && (item.active = 1))
		},
		methods: {
			choose(index) {
				this.remarks.forEach(item => item.active = 0)
				this.remarks[index].active = 1
				this.remark = this.remarks[index].label
			},
			handleTextareaInput(e) {
				if(e.detail.value.length >= 50) {
					uni.showToast({icon: 'none', title: '最多备注50个字符'})
					return
				}
			},
			submit() {
				this.$store.commit('SET_REMARK', this.remark)
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #FFFFFF;
		padding: 40rpx;
	}
	
	.remarks {
		margin-bottom: 40rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: $font-size-base;
		
		.remark {
			color: $text-color-assist;
			padding: 10rpx 26rpx;
			border: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			margin-right: 20rpx;
			
			&.active {
				color: #343434;
				border-color: #343434;
			}
		}
	}
	
	.textarea-box {
		.textarea {
			width: 100%;
			border: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			padding: 20rpx;
			font-size: $font-size-medium;
		}
	}
</style>
