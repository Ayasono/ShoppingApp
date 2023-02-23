<template>
	<div class="brandDetail">
		<van-nav-bar
			title="品牌"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>

		<div class="banner">
			<img :src="res.app_list_pic_url" alt="">
			<div class="manufacturer">
				{{ res.name }}
				<div class="underline"></div>
			</div>
		</div>

		<div class="desc">
			{{ res.simple_desc }}
		</div>

		<van-grid :column-num="2">
			<van-grid-item class="item-cards" v-for="item in goodsList" :key="item.id" @click="turnToItemDetails(item)">
				<img :src="item.list_pic_url" alt="">
				<div class="desc">
					<div class="title">
						{{ item.name }}
					</div>

					<div class="price">
						{{ item.retail_price }}
					</div>
				</div>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
import getBrandDetails from "@/api/home/brand/brandActions";

export default {
	name: 'Branddetail',
	data() {
		return {
			res: '',
			goodsList: '',
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back()
		},
		init() {
			let id = this.$route.query.id
			getBrandDetails(id)
				.then(res => {
					this.res = res.data
					this.goodsList = res.goodsList
				})
		},
		turnToItemDetails(item) {
			this.$router.push({
				path: '/itemDetail',
				query: {
					id: item.id
				}
			})
		}
	},
	created() {
		this.init()
	}
};
</script>

<style lang="scss" scoped>
.banner {
	position: relative;

	img {
		height: 3.84rem /* 144/37.5 */
	;
		width: 100%;
	}

	.manufacturer {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.533rem /* 20/37.5 */
	;
		color: white;

		.underline {
			width: 100%;
			height: 2px;
			background-color: #fff;
		}
	}
}

.desc {
	color: lightgray;
	background-color: #fff;
	font-size: 15px;
	padding: 0.533rem /* 20/37.5 */
;
	margin-bottom: 8px;
}

.item-cards {
	img {
		width: 140px;
		height: 140px;
	}

	.desc {
		text-align: center;
		.title {
			font-size: 12px;
			color: black;
		}

		.price {
			margin-top: 10px;
			font-size: 12px;
			color: #b4282d;
		}
	}
}

</style>
