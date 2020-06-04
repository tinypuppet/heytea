<template>
	<view class="container">
		<view class="integrals-section">
			<view class="integrals">
				<view class="title">当前等级</view>
				<view class="value">Lv1</view>
			</view>
			<view class="experience">
				<view class="row">经验值：60/299</view>
				<view class="row" @tap="integralScores">
					<view>当前积分：74</view>
					<image src="/static/images/common/jump-r-arrow.png" class="jump-icon"></image>
				</view>
			</view>
		</view>
		<view class="tasks-section">
			<view class="header">
				<view class="title">周期任务</view>
				<view class="subtitle">每周日24:00重置</view>
			</view>
			<list-cell v-for="(task, index) in periodTasks" :key="index">
				<view class="task">
					<view class="content">
						<view class="desc">{{ task.desc }}</view>
						<view class="integral">
							<view class="text">积分</view>
							<view class="value">+{{ task.value }}</view>
						</view>
					</view>
					<view class="action">
						<template v-if="!task.is_completed">
							<button :type="task.is_enable ? 'primary' : 'default'" 
									:disabled="!task.is_enable ? true : false" size="mini">
									去完成
							</button>
						</template>
						<template v-else>
							<image src="/static/images/member/me_club_task_img_done.png" class="completed-img"></image>
						</template>
					</view>
				</view>
			</list-cell>
		</view>
		<view class="tasks-section">
			<view class="header">
				<view class="title">成长任务</view>
			</view>
			<list-cell v-for="(task, index) in growTasks" :key="index">
				<view class="task">
					<view class="content">
						<view class="desc">{{ task.desc }}</view>
						<view class="integral">
							<view class="text">积分</view>
							<view class="value">+{{ task.value }}</view>
						</view>
					</view>
					<view class="action">
						<template v-if="!task.is_completed">
							<button :type="task.is_enable ? 'primary' : 'default'" 
									:disabled="!task.is_enable ? true : false" size="mini">
									去完成
							</button>
						</template>
						<template v-else>
							<image src="/static/images/member/me_club_task_img_done.png" class="completed-img"></image>
						</template>
					</view>
				</view>
			</list-cell>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/list-cell/list-cell.vue'

export default {
	components: {
		listCell
	},
	data() {
		return {
			periodTasks: [
				{ desc: '每周线上消费3次(0/3)', value: 10, is_completed: false, is_enable: false },
				{ desc: '每周消费喜茶食验室1次', value: 5, is_completed: false, is_enable: true },
				{ desc: '每日签到（奖励随机翻倍）', value: 1, is_completed: true, is_enable: false }
			],
			growTasks: [
				{ desc: '首次成为星球会员', value: 50, is_completed: false, is_enable: false },
				{ desc: '累计消费10次(3/10)', value: 25, is_completed: false, is_enable: false },
				{ desc: '累计消费30次(3/30)', value: 30, is_completed: false, is_enable: false },
				{ desc: '累计消费60次(3/60)', value: 40, is_completed: false, is_enable: false },
				{ desc: '完善个人资料', value: 10, is_completed: true, is_enable: false }
			]
		}
	},
	methods: {
		integralScores() {
			uni.navigateTo({
				url: '/pages/integrals/scores'
			})
		}
	}
};
</script>

<style lang="scss">
.integrals-section {
	position: relative;
	margin-top: -100rpx;
	background: url('@/static/images/mall/me_img_banner_mall.png') no-repeat;
	background-size: 100% 100%;
	width: 100%;
	height: 420rpx;
	padding: 30rpx 40rpx;
	padding-top: 130rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20rpx;

	.integrals {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: $font-size-sm;
		color: $text-color-base;

		.title {
			font-weight: bold;
		}

		.value {
			font-family: 'wenyue';
			font-size: 42rpx;
			margin-top: 10rpx;
		}
	}

	.experience {
		display: flex;
		flex-direction: column;
		font-size: $font-size-medium;
		color: $text-color-grey;
		align-items: flex-start;

		.row {
			display: flex;
			align-items: center;

			.jump-icon {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
}

.tasks-section {
	background-color: $bg-color-white;
	margin-bottom: 20rpx;

	.header {
		display: flex;
		align-items: center;
		padding: 30rpx;

		.title {
			font-size: $font-size-lg;
			color: $font-size-base;
			font-weight: 500;
			margin-right: 20rpx;
		}

		.subtitle {
			font-size: $font-size-sm;
			color: $text-color-assist;
		}
	}

	.task {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.desc {
				font-size: $font-size-medium;
				font-weight: 500;
				color: $text-color-base;
				margin-bottom: 10rpx;
			}

			.integral {
				display: flex;
				align-items: center;
				font-size: $font-size-sm;

				.text {
					color: $text-color-assist;
				}

				.value {
					color: $color-primary;
				}
			}
		}

		.action {
			button {
				border: 2rpx solid #edeeee !important;
				border-radius: 50rem !important;
				font-size: $font-size-sm;

				&.button-hover {
					opacity: 0.6;
				}
			}

			.completed-img {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
}
</style>
