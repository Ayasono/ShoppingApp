<template>
	<div class="BlockList">
		<div class="singleList" v-for="item in list" :key="item.id">
			<p>{{ item.name }}</p>

			<ul class="cards">
				<li class="card" v-for="card in item.goodsList" :key="card.id" @click="jumpToDetail(card.id)">
					<img :src="card.list_pic_url" alt="none">
					<p>{{ card.name }}</p>
					<p class="price">¥{{ card.retail_price }}</p>
				</li>

				<li class="card" @click="jumpToCate(item.id)">
					<div class="slogan">
						<div class="name">
							{{ item.name }}好物
						</div>
					</div>
					<img class="arrow" src="../../assets/images/icon_go_more.png" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Blocklist',
	methods: {
		jumpToDetail(id) {
			this.$router.push(
				{
					path: '/itemDetail',
					query: {
						id
					}
				}
			)
		},
		jumpToCate(id) {
			this.$router.push({
				path: '/category/detail', query: {
					id
				}
			})
		}
	},
	props: ['list'],
	created() {
		console.log(this.list)
	}
};
</script>

<style lang="scss" scoped>
.BlockList {
	.singleList {
		margin-top: 20px;
		width: 100%;
		text-align: center;

		.cards {
			display: flex;
			flex-flow: wrap;
			justify-content: space-evenly;

			.slogan {
				margin-top: 35px;
				width: 100%;
				text-align: center;

				.name {
					font-size: .44rem;
				}
			}

			.arrow {
				display: block;
				margin: 30px auto !important;
				width: 0.933rem !important /* 35/37.5 */
			;
				height: 0.933rem !important /* 35/37.5 */
			;
			}

			.card {
				margin-bottom: 4px;
				background-color: #fff;
				box-sizing: border-box;
				width: 180px;
				height: 200px;

				img {
					display: block;
					margin: 0 auto;
					width: 130px;
					height: 130px;
				}

				p {
					text-align: left;
					margin-left: 10px;
				}

				.price {
					color: #9a484e;
				}
			}
		}
	}
}
</style>
