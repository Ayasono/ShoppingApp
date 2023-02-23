<template>
	<div class="SearchPrompt">
		<div class="item" v-for="item in searchList" :key="item.id" @click="turnToDetail(item)">
			{{ item.name }}
		</div>
	</div>
</template>

<script>
import helperaction from "@/api/home/search/helperaction";
import addHistory from "@/api/home/search/addHistory/addHistory";

export default {
	name: 'SearchPrompt',
	data() {
		return {
			searchList: '',
		}
	},
	methods: {
		turnToDetail(item) {
			addHistory({
				keyword: item.name,
				openId: localStorage.getItem('openId')
			})
				.then(res => {
					console.log(res)
				})
			this.$emit('showDefault', true)
		},
	},
	props: ['data'],
	watch: {
		data: {
			handler: function (n, o) {
				helperaction({keyword: n, order: 'desc'})
					.then(res => {
						this.searchList = res.keywords
						// console.log(this.searchList)
					})
			},
			immediate: true,
		}
	}
};
</script>

<style lang="scss" scoped>
.SearchPrompt {
	.item {
		width: 100%;
		height: 30px;
		font-size: 12px;
		line-height: 20px;
		background-color: #fff;
		padding-left: 15px;
	}
}
</style>
