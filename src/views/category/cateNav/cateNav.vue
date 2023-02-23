<template>
	<div class="cateNav">
		<van-nav-bar
			title="详情"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>

		<van-tabs @click="switchById" v-model="$store.state.cateActive">
			<div class="intro">
				<div class="title">
					{{ currentNav.front_name }}
				</div>
				<div class="desc">
					{{ currentNav.front_desc }}
				</div>
			</div>

			<van-tab v-for="item in navData" :title="item.name" :key="item.id">
				<van-empty v-if="ifEmptyData" description="No Data" />
				<van-grid icon-size="120px" :column-num="2">
					<van-grid-item
						@click="turnToItemDetail(item.id)"
						v-for="item in goodsList"
						:key="item.id"
						:icon="item.list_pic_url"
						:text="item.name"
					/>
				</van-grid>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { cateNav, goodsList } from "@/api/category";

	export default {
		name: "Catenav",
		data() {
			return {
				navData: "",
				goodsList: "",
				currentNav: "",
			};
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			switchById(index, name) {
				let id = this.navData[index].id;
				this.$store.state.cateActive = index;

				cateNav({
					id,
				}).then((res) => {
					({ navData: this.navData, currentNav: this.currentNav } = res);

					goodsList({
						categoryId: id,
					}).then((res) => {
						this.goodsList = res.data;
					});
				});
			},
			turnToItemDetail(id) {
				this.$router.push({
					name: "itemDetail",
					query: {
						id,
					},
				});
			},
		},
		computed: {
			ifEmptyData() {
				return this.goodsList.length === 0;
			},
		},
		created() {
			let id = this.$route.query.id;

			cateNav({
				id,
			}).then((res) => {
				({ navData: this.navData, currentNav: this.currentNav } = res);
				this.$store.state.cateActive = this.navData.findIndex(
					(el) => el.id === ~~id
				);
			});

			goodsList({
				categoryId: id,
			}).then((res) => {
				this.goodsList = res.data;
			});
		},
	};
</script>

<style lang="scss" scoped>
	.intro {
		margin-top: 8px;
		text-align: center;
		height: 100px;
		background-color: #fff;
		padding-top: 0.1px;

		.title {
			margin-top: 32px;
			font-size: 14px;
			width: 100%;
			margin-bottom: 16px;
		}

		.desc {
			font-size: 12px;
			width: 100%;
			color: #8c8989;
		}
	}
</style>
