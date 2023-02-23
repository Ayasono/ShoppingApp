<template>
	<div class="mine">
		<div class="personal-info">
			<div class="icon">
				<img src="https://img0.baidu.com/it/u=2936316438,1380992198&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
				     alt="">
			</div>
		</div>

		<van-grid clickable :column-num="3">
			<van-grid-item @click="onItemClick($event.target)" class="items" v-for="(item, index) in mineList" :key="index" :text="item"/>
		</van-grid>
	</div>
</template>

<script>
import getCollection from "@/api/collect/getCollection";

export default {
	name: 'Mine',
	data() {
		return {
			mineList: ['我的订单', '优惠券', '我的足迹', '我的收藏', '地址管理', '联系客服', '帮助中心', '意见反馈']
		}
	},
	methods: {
		onItemClick(e) {
			let index = this.mineList.findIndex(el => e.innerText === el)
			switch (index) {
				case 3:
					this.$router.push('/mine/collection')
					break
				case 4:
					this.$router.push('/mine/address')
					break
				case 7:
					this.$router.push('/mine/advice')
					break
			}
		}
	},
	created() {
		this.$store.state.active = 4
	}
};
</script>

<style lang="scss" scoped>
.mine {
	.personal-info {
		display: flex;
		align-items: center;
		width: 100%;
		height: 3.733rem /* 140/37.5 */
	;
		background-color: rgb(51, 51, 51);

		.icon {
			margin-left: 15px;

			img {
				width: 1.973rem /* 74/37.5 */
			;
				height: 1.973rem /* 74/37.5 */
			;
				border-radius: 50%;
			}
		}
	}
}

.items {
	height: 72px;

	.van-tabbar-item__text {
		color: black;
	}
}

</style>
