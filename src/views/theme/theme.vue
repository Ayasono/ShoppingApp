<template>
	<div class="theme">
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<div class="item" v-for="item in list" :key="item.id">
				<img :src="item.scene_pic_url" alt="none">
				<div class="title">{{ item.title }}</div>
				<div class="subtitle">{{ item.subtitle }}</div>
				<div class="price">{{ item.price_info }}元起</div>
			</div>
		</van-list>
	</div>
</template>

<script>
import endlessReq from "@/api/theme/endless";

export default {
	name: 'Theme',
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			page: 1,
		}
	},
	methods: {
		async onLoad() {
			let res = await endlessReq({
				page: this.page
			})
			this.loading = false

			this.list = [...this.list, ...res.data]
			if (this.page === 4) return this.finished = true
			this.page++
		}
	},
	created() {
		this.$store.state.active = 1
	}
};
</script>

<style scoped lang="scss">
.theme {
	padding-bottom: 1.333rem /* 50/37.5 */
;

	.item {
		background-color: #fff;
		padding-bottom: 12pt;
		margin-bottom: 6pt;

		img {
			width: 100%;
			height: 170pt;
		}

		.title {
			margin-top: 10pt;
			width: 100%;
			text-align: center;
			font-size: 0.453rem /* 17/37.5 */
		;
			color: rgb(51, 51, 51);
		}

		.subtitle {
			font-size: 0.32rem /* 12/37.5 */
		;
			color: rgb(153, 153, 153);
			width: 100%;
			text-align: center;
			margin-top: 12pt;
		}

		.price {
			margin-top: 0.24rem /* 9/37.5 */
		;
			text-align: center;
			width: 100%;
			font-size: 13px;
			color: rgb(180, 40, 45);
		}
	}
}

</style>
