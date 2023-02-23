<template>
	<div class="HistoryAndTrend">
		<div class="title">
			<slot name="title">placeholder</slot>
		</div>

		<div class="displayKeywords clearfix">
			<div class="keyword" :class="item.is_hot === 1 ? 'hot': ''" v-for="(item, index) in data" :key="index">
				{{ item.keyword }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Historyandtrend',
	data() {
		return {
			isShown: true,
		}
	},
	props: ['data'],
};
</script>

<style lang="scss" scoped>
.HistoryAndTrend {
	padding: 0 0.4rem /* 15/37.5 */
;
	background-color: #fff;

	.title {
		margin-top: 0.453rem /* 17/37.5 */
	;
		font-size: 0.347rem /* 13/37.5 */
	;
	}

	.displayKeywords {

		.keyword {
			margin: 5px 5px;
			float: left;
			padding: 5px;
			color: black;
			font-size: 12px;
			border: 1px black solid;
			width: fit-content;
		}
	}
}

.clearfix:after {
	content: "";
	display: block;
	visibility: hidden;
	clear: both;
}

.hot {
	color: #9a484e !important;
	border: 1px #9a484e solid !important;
}
</style>