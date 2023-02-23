<template>
	<div class="home">
		<!--		top search engine-->
		<div class="top-bar">
			<div class="location" @click="jumpToLocation">
				<p>{{ currentCity }}</p>
			</div>
			<van-sticky class="search-bar">
				<van-search @click="jumpToSearch" v-model="value" placeholder="输入关键词"/>
			</van-sticky>
		</div>

		<!--		swiper-->
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
			<van-swipe-item v-for="(item, id) in banner" :key="id">
				<img :src="item.image_url" alt="none">
			</van-swipe-item>
		</van-swipe>

		<!--		channel-->
		<div class="channel">
			<a v-for="item in channel" :key="item.id">
				<div class="item-card" @click="jumpToCateNav(item.id)">
					<img :src="item.icon_url" alt="none">
					<p> {{ item.name }} </p>
				</div>
			</a>
		</div>

		<!--		brand list-->
		<div class="brandList">
			<div class="propaganda">
				<p class="text">品牌制造商直供</p>
			</div>

			<ul class="itemList">
				<li class="items" v-for="item in brandList" :key="item.id" @click="jumpToBrand(item.id)">
					<a><img
						:src="item.new_pic_url" alt="none"></a>
					<p class="pinText1">{{ item.name }}</p>
					<p class="pinText2">{{ item.floor_price }}起</p>
				</li>
			</ul>
		</div>

		<!--		new brand-->
		<Banner color="rgb(236, 241, 251)" btncolor="rgb(210, 210, 210)" textcolor="rgb(120, 140, 170)" type="new">
			<template v-slot:title>
				新品首发
			</template>

			<template v-slot:checkAll>
				查看全部
			</template>
		</Banner>

		<!--		new goods-->
		<NewGoods :newGoodsData="newGoods">

		</NewGoods>

		<!--		new brand2-->
		<Banner color="rgb(255, 245, 220)" btncolor="rgb(242, 228, 191)" textcolor="rgb(185, 185, 185)" type="hot">
			<template v-slot:title>
				人气推荐 好物精选
			</template>

			<template v-slot:checkAll>
				查看全部
			</template>
		</Banner>

		<!--		hot goods-->
		<NewGoods :newGoodsData="hotGoods">

		</NewGoods>

		<!--	new category list-->
		<BlockList :list="newCategoryList"></BlockList>
	</div>
</template>

<script>
import homeDataRequest from "@/api/home";
import Banner from '../../components/home/Banner'
import NewGoods from "@/components/NewGoods/NewGoods";
import BlockList from "@/components/BlockList/BlockList";

export default {
	name: 'home',
	data() {
		return {
			value: '',
			banner: '',
			brandList: '',
			channel: '',
			hotGoods: '',
			newCategoryList: '',
			newGoods: '',
			topicList: '',
			currentCity: ''
		}
	},
	methods: {
		jumpToSearch() {
			this.$router.push('/home/search')
		},
		jumpToLocation() {
			this.$router.push('/home/location')
		},
		jumpToCateNav(id) {
			this.$router.push({
				path: '/category/detail',
				query: {
					id
				}
			})
		},
		jumpToBrand(id) {
			this.$router.push({
				path: '/home/brand',
				query: {
					id
				}
			})
		},
	},
	components: {
		Banner,
		NewGoods,
		BlockList,
	},
	created() {
		homeDataRequest()
			.then(res => {
				// init data
				({
					banner: this.banner,
					brandList: this.brandList,
					channel: this.channel,
					hotGoods: this.hotGoods,
					newCategoryList: this.newCategoryList,
					newGoods: this.newGoods,
					topicList: this.topicList
				} = res)
			})
			.catch(err => {
				console.log(err)
			})
		this.$store.state.active = 0
	},
	mounted() {
		if (this.$store.state.address === '') {
			let v = this
			AMap.plugin('AMap.CitySearch', function () {
				var citySearch = new AMap.CitySearch()
				citySearch.getLocalCity(function (status, result) {
					if (status === 'complete' && result.info === 'OK') {
						// 查询成功，result即为当前所在城市信息
						v.currentCity = result.city
					}
				})
			})
		} else {
			this.currentCity = this.$store.state.address
		}
	}
}
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
	img {
		width: 100%;
		height: 5.333rem /* 200/37.5 */
	;
	}

	width: 100%;
	height: 5.333rem /* 200/37.5 */
;
}

::v-deep .van-swipe__indicator {
	background-color: grey;
}

.top-bar {
	display: flex;

	.location {
		background-color: #fff;
		text-align: center;

		p {
			max-width: 40px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0;
			line-height: 48px;
			width: max-content;
			font-size: 12px;
		}
	}

	.search-bar {
		width: 100%;
		height: 1.333rem /* 50/37.5 */
	;
	}
}

.box {
	width: 100%;
	height: 1000px;
}

.channel {
	display: flex;
	align-content: center;
	justify-content: space-around;
	text-align: center;
	padding-bottom: 0.267rem /* 10/37.5 */
;
	margin-bottom: 8px;
	font-size: 0.32rem /* 12/37.5 */
;
	background-color: #fff;
	width: 100%;
	height: 2.133rem /* 80/37.5 */
;

	img {
		margin-top: 0.347rem /* 13/37.5 */
	;
		width: 0.8rem /* 30/37.5 */
	;
		height: 0.8rem /* 30/37.5 */
	;
	}

	a {
		text-decoration: none;
		color: black;
	}

	p {
		margin-top: 0.427rem /* 16/37.5 */
	;
	}
}

.brandList {
	background-color: #fff;
	padding-bottom: 0.107rem /* 4/37.5 */
;

	.propaganda {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 1.2rem /* 45/37.5 */
	;
		text-align: center;
	}

	.itemList {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-content: space-evenly;

		img {
			display: block;
			width: 4.747rem /* 178/37.5 */
		;
			height: 3.093rem /* 116/37.5 */
		;
		}
	}

	.items {
		position: relative;

		.pinText1 {
			position: absolute;
			left: 0.133rem /* 5/37.5 */
		;
			top: 0.187rem /* 7/37.5 */
		;
		}

		.pinText2 {
			position: absolute;
			left: 0.133rem /* 5/37.5 */
		;
			top: 0.8rem /* 30/37.5 */
		;
		}
	}
}


</style>
