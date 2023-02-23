<template>
	<div class="category">
		<van-search v-model="value" placeholder="请输入搜索关键词"/>
		<div class="content">
			<div class="left">
				<van-sidebar v-model="activeKey">
					<van-sidebar-item @click="getContent(item.id, item.index)" v-for="item in cateList" :key="item.id"
					                  :title="item.name"/>
				</van-sidebar>
			</div>

			<div class="right">
				<img :src="bannerUrl" alt="" class="banner">
				<p>--- {{ currentTitle }}分类 ---</p>
				<ul>
					<li @click="turnToDetail(item)" v-for="item in subList" :key="item.id">
						<img :src="item.wap_banner_url" alt="">
						<p>{{ item.name }}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {getIndex} from "@/api/category"
import getContentById from "@/views/category/DisplayCate/getContentById/getContentById";

export default {
	name: 'Category',
	data() {
		return {
			value: '',
			activeKey: 0,
			cateList: [],
			subList: [],
			bannerUrl: '',
			currentTitle: '',
		}
	},
	methods: {
		getContent(id, index) {
			this.activeKey = index
			getContentById({id})
				.then(res => {
					this.subList = res.data.currentOne.subList
					this.bannerUrl = res.data.currentOne.banner_url
					this.currentTitle = res.data.currentOne.name
				})
		},
		turnToDetail(item) {
			this.$router.push({
				path: '/category/detail', query: {
					id: item.id
				}
			})
		}
	},
	created() {
		let id = 1005000 // by default
		getIndex()
			.then(res => {
				this.cateList = res.categoryList
			})
		getContentById({id})
			.then(res => {
				this.subList = res.data.currentOne.subList
				this.bannerUrl = res.data.currentOne.banner_url
				this.currentTitle = res.data.currentOne.name
			})
		this.$store.state.active = 2
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	padding-right: 0.293rem /* 11/37.5 */
;
	background-color: #fff;
	padding-bottom: 50px;

	.right {
		.banner {
			width: 100%;
			height: 2.907rem /* 109/37.5 */
		;
		}

		p {
			margin-bottom: 0.64rem /* 24/37.5 */
		;
			width: 100%;
			text-align: center;
			padding-top: 0.533rem /* 20/37.5 */
		;
			font-size: 0.347rem /* 13/37.5 */
		;
		}

		ul {
			display: flex;
			flex-wrap: wrap;

			li {
				width: 2.347rem /* 88/37.5 */
			;
				height: 2.347rem /* 88/37.5 */
			;
				margin-bottom: 10px;

				img {
					display: block;
					margin: 0 auto;
					width: 1.6rem /* 60/37.5 */
				;
					height: 1.6rem /* 60/37.5 */
				;
				}

				p {
					font-size: 12px;
					padding-top: 0;
				}
			}
		}
	}
}
</style>
