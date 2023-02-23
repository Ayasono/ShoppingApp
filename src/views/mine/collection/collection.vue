<template>
	<div class="collection">
		<van-nav-bar
			title="收藏"
			left-text="后退"
			left-arrow
			@click-left="onClickLeft"
		/>

		<div class="title">
			我的收藏
		</div>

		<van-grid :column-num="2">
			<van-grid-item class="items" v-for="item in collectionList" :key="item.id" @click="jumpToDetail(item.id)">
				<img :src="item.list_pic_url" alt="">
				<div class="desc">
					<div class="subtitle">
						{{ item.name }}
					</div>

					<div class="price">
						¥ {{ item.retail_price }}
					</div>
				</div>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
import getCollection from "@/api/collect/getCollection";

export default {
	name: 'Collection',
	data() {
		return {
			collectionList: [],
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back()
		},
		jumpToDetail(id){
			this.$router.push({
				path: '/itemDetail',
				query: {
					id
				}
			})
		}
	},
	created() {
		getCollection(localStorage.getItem('openId'))
			.then(res => {
				console.log(res)
				this.collectionList = res.collectGoodsList
			})
	}
};
</script>

<style lang="scss" scoped>
.collection {
	.title {
		background-color: #fff;
		height: 50px;
		font-weight: bolder;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		margin: 2px 0;
	}

	.items {
		img {
			display: block;
			margin: 0 auto;
			width: 151px;
			height: 151px;
		}
		.desc {
			width: 100%;
			padding-left: 20px;
			.subtitle {

			}

			.price {
				margin-top: 12px;
				color: #9a484e;
			}
		}
	}
}

</style>