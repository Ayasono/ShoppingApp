<template>
	<div class="newgoods">
		<van-nav-bar
			title="乐购"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<!--		<van-grid :column-num="3" id="top-bar">
					<van-grid-item text="综合"/>
					<van-grid-item id="price">
						<p>价格</p>
						<div class="icon">
							<van-icon name="arrow-up"/>
							<van-icon name="arrow-down"/>
						</div>
					</van-grid-item>
					<van-grid-item text="分类"/>
				</van-grid>-->
		<div class="top-nav">
			<div class="default" @click="handleDefault" :class="current==='default'?'active': ''">
				综合
			</div>

			<div class="expense" @click="handleOrder()" :class="current==='price'?'active':''">
				价格
				<div class="icon">
					<van-icon name="arrow-up" size="3" :class="isDesc ? '' : 'active'"/>
					<van-icon name="arrow-down" size="3" :class="isDesc ? 'active' : ''"/>
				</div>
			</div>

			<div class="category" @click="handleCategory" :class="current==='category'?'active':''">
				分类
			</div>
		</div>

		<van-grid :column-num="2">
			<van-grid-item class="item" v-for="item in list" :key="item.id">
				<img :src="item.list_pic_url" alt="">
				<p>{{ item.name }}</p>
				<p class="price">¥{{ item.retail_price }}</p>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
import typeOrTrend from "@/api/home/search/typeortrend/typeortrend";

export default {
	name: 'Newgoods',
	data() {
		return {
			type: '',
			list: '',
			isDesc: false,
			current: 'default'
		}
	},
	methods: {
		onClickLeft() {
			this.$router.replace('/home')
		},
		handleOrder() {
			this.current = 'price'
			this.sendReq()
		},
		handleDefault() {
			this.current = 'default'
			this.isDesc = !this.isDesc
			this.sendReq()
		},
		handleCategory() {
			this.current = 'category'
			this.isDesc = !this.isDesc
			this.sendReq()
		},
		sendReq() {
			this.isDesc = !this.isDesc
			this.type = this.$route.params.type
			let params = {}

			this.type === 'hot' ? params.isHot = 1 : params.isNew = 1
			params.order = this.isDesc ? 'desc' : 'asc'
			typeOrTrend(params)
				.then(res => {
					this.list = res.data
				})
		}
	},
	created() {
		this.handleOrder()
	}
};
</script>

<style lang="scss" scoped>
.item {
	height: 5.333rem /* 200/37.5 */
;
	width: auto;

	img {
		height: 2.48rem /* 93/37.5 */
	;
		width: 3.2rem /* 120/37.5 */
	;
	}
}

.top-nav {
	height: 20pt;
	width: 100%;
	display: flex;
	text-align: center;
	line-height: 20pt;
	font-size: 0.32rem /* 12/37.5 */
;
	justify-content: space-around;
	margin-bottom: 4pt;
	background-color: #fff;

	.expense {
		display: flex;

		.icon {
			height: 100%;
			margin-left: 0.107rem /* 4/37.5 */
		;
			display: flex;
			flex-direction: column;
			color: rgb(203, 203, 203);
		}
	}

	.default, .expense, .category {

	}
}

.top-bar {
	height: 0.8rem /* 30/37.5 */
;
}

.price {
	color: #9a484e;
}

.active {
	color: #9a484e;
}
</style>
