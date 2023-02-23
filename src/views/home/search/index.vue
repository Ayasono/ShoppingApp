<template>
	<div class="search">
		<van-nav-bar
			title="乐购"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>

		<!-- 搜索框 bug: cannot perform click event when on blur -->
		<van-search v-model.trim="value" @input="showPrompt" placeholder="请输入搜索关键词"/>

		<div v-if="current === 'default'">
			<HistoryAndTrend :data="history">
				<template v-slot:title>
					历史记录
				</template>
			</HistoryAndTrend>

			<HistoryAndTrend :data="hotKeywords">
				<template v-slot:title>
					热门搜索
				</template>
			</HistoryAndTrend>
		</div>

		<SearchPrompt @showDefault="changeToDefault" v-else-if="current === 'show prompt'" :data="value"></SearchPrompt>
	</div>
</template>

<script>
import {searchHistoryAndTrend} from "@/api/home/search"
import SearchPrompt from "@/components/home/SearchPrompt/SearchPrompt";
import HistoryAndTrend from "@/views/home/search/HistoryAndTrend/HistoryAndTrend";

export default {
	name: "index",
	data() {
		return {
			value: '',
			history: '',
			hotKeywords: '',
			defaultKeyword: '',
			isDefault: true,
			current: 'default'
		}
	},
	methods: {
		onClickLeft() {
			this.$router.replace('/home')
		},
		showPrompt() {
			this.current = 'show prompt'
		},
		changeToDefault() {
			this.current = 'default'
		}
	},
	components: {
		HistoryAndTrend,
		SearchPrompt
	},
	created() {
		let id = localStorage.getItem('openId')
		searchHistoryAndTrend({openId: id})
			.then(res => {
				({historyData: this.history, hotKeywordList: this.hotKeywords} = res)
				console.log(res)
			})
	}
}
</script>

<style scoped>

</style>