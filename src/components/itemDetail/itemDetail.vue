<template>
	<div class="itemDetail">
		<!--	    跳转进入该页面时需要传入商品id-->
		<van-nav-bar
			title="详情"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<!--		swipe-->
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in bannerPicList" :key="item.id">
				<img :src="item.img_url" alt="">
			</van-swipe-item>
		</van-swipe>

		<ul class="tips">
			<li>30天无忧退货</li>
			<li>48小时快速退款</li>
			<li>满88元免邮费</li>
		</ul>

		<div class="intro" v-if="res.info">
			<div class="title">{{ res.info.name }}</div>
			<div class="desc">{{ res.info.goods_brief }}</div>
			<div class="price">¥{{ res.info.retail_price }}</div>
		</div>

		<div class="purchase-option">
			<div class="text">请选择规格数量</div>
			<div class="right-arrow">
				<img src="../../assets/images/address_right.png" alt="">
			</div>
		</div>

		<div class="item-config">
			<h2>商品参数</h2>
			<ul>
				<li v-for="(item, index) in res.attribute" :key="index">
					<div class="config">
						{{ item.name }}
					</div>
					<div class="config-details">
						{{ item.value }}
					</div>
				</li>
			</ul>
		</div>

		<div class="goods-desc" v-html="goodsDesc">
		</div>

		<div class="common-question" v-if="res.issue">
			<van-divider dashed>常见问题</van-divider>

			<ul>
				<li v-for="item in res.issue" :key="item.id">
					<div class="dot"></div>
					<div class="question">
						{{ item.question }}
					</div>

					<div class="answer">
						{{ item.answer }}
					</div>
				</li>
			</ul>
		</div>

		<div class="recommend">
			<van-divider dashed>大家都在看</van-divider>
			<van-grid :column-num="2" icon-size="151px">
				<van-grid-item v-for="item in recommend" :key="item.id" :icon="item.list_pic_url" :text="item.name"/>
			</van-grid>
		</div>

		<div class="shopItem">
			<div class="collection" @click="collectAct">
				<img v-if="isCollected" src="../../assets/images/icon_collect_checked.png" alt="">
				<img v-else src="../../assets/images/icon_collect.png" alt="">
			</div>
			<div class="shopping-cart">
				<img src="../../assets/images/ic_menu_shoping_nor.png" alt="">
			</div>
			<div class="purchase" @click="jumpToCart">立即购买</div>
			<div class="add-to-cart" @click="addToCart">加入购物车</div>
		</div>

		<van-popup class="popup" v-if="res.info" v-model="show" position="bottom" :style="{ bottom: '60px' }">
			<div class="top">
				<img :src="res.info.primary_pic_url" alt="">
				<div class="text">
					<div class="price">
						价格¥{{ res.info.retail_price }}
					</div>
					<div class="quant">
						请选择数量
					</div>
				</div>
			</div>
			<div class="quantity">
				数量
			</div>
			<van-stepper class="stepper" v-model="itemQuant" />
		</van-popup>

	</div>
</template>

<script>
import getItemDetail from "@/api/itemDetail/getItemDetail";
import {collect} from "@/api/collect";
import {Toast} from "vant";
import addToCart from "@/api/cart/addToCart";

export default {
	name: 'Itemdetail',
	data() {
		return {
			bannerPicList: '',
			res: '',
			goodsId: '',
			goodsUnit: '',
			show: false,
			imgUrl: '',
			goodsDesc: '',
			recommend: '',
			itemQuant: 0,
			isCollected: false,
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back()
		},
		jumpToCart() {
			this.$router.push('/cart')
		},
		addToCart() {
			if (this.show) {
				addToCart(
					{
						goodsId: this.goodsId,
						number: this.itemQuant,
						openId: localStorage.getItem('openId')
					}
				)
				.then(res => {
					console.log(res)
					Toast('加入购物车成功！')
				})
			}
			this.show = true
		},
		collectAct() {
			collect({
				goodsId: this.goodsId,
				openId: localStorage.getItem('openId')
			})
				.then(res => {
					if (res.data === 'success' && !this.isCollected) {
						Toast('收藏成功！')
						this.isCollected = !this.isCollected
					} else {
						Toast('取消收藏成功！')
						this.isCollected = !this.isCollected
					}
				})
		}
	},
	created() {
		getItemDetail(this.$route.query.id, localStorage.getItem('openId'))
			.then(res => {
				({gallery: this.bannerPicList} = res)
				console.log(res)
				this.res = res
				this.goodsId = res.info.id
				this.goodsUnit = res.info.goods_unit
				this.imgUrl = res.info.list_pic_url
				this.goodsDesc = res.info.goods_desc
				this.recommend = res.productList
				this.isCollected = res.collected
			})
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.block {
	width: 120px;
	height: 120px;
	background-color: #fff;
}

.my-swipe .van-swipe-item {
	color: #fff;

	img {
		width: 100%;
		height: 375px;
	}
}

.tips {
	display: flex;
	list-style: inside;
	margin-bottom: 15px;

	li {
		line-height: 30px;
		font-size: 12px;
		width: 33%;
		height: 30px;
		text-align: center;
		color: gray;
	}
}

.intro {
	background-color: #fff;
	text-align: center;

	.title {
		padding-top: 12px;
		font-size: 20px;
		margin-bottom: 16pt;
	}

	.desc {
		color: #7b8792;
		font-size: 12px;
	}

	.price {
		margin-top: 10px;
		font-size: 17px;
		padding-bottom: 12px;
		color: #9a484e;
	}
}

.purchase-option {
	width: 100%;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 54px;

	.text {
		padding-left: 15px;
		height: 100%;
		line-height: 54px;
	}

	img {
		width: 26px;
		height: 26px;
		padding-right: 15px;
	}
}

.shopItem {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 60px;
	z-index: 99999;
	background-color: #fff;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	> div {
		width: 25%;
		height: 100%;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	> div:not(.add-to-cart) {
		border: #eee 1px solid;
	}

	img {
		width: 20px;
		height: 20px;
	}

	.add-to-cart {
		background-color: #b4282d;
		color: white;
	}
}

.item-config {
	background-color: #fff;
	padding-bottom: 30px;
	h2 {
		margin-top: 15px;
		font-size: .50667rem;
		padding: 0.26667rem 20px;
	}

	ul {
		li {
			margin: 10px auto;
			padding: 10px 0;
			width: 80%;
			display: flex;
			background-color: rgb(241, 241, 241);
			white-space: nowrap;

			.config {
				width: 70px;
				color: #8c8989;
			}

			.config-details {
				padding-left: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}

.goods-desc {
	width: 100%;

	::v-deep p {
		width: 100%;

		img {
			width: 100%;
		}
	}
}

.common-question {
	background-color: #fff;
	padding-top: 10px;
	padding-left: 10px;

	ul {
		padding-bottom: 10px;

		li {
			margin-bottom: 5px;

			.dot {
				display: inline-block;
				width: 4px;
				height: 4px;
				border-radius: 50%;
				background-color: #b4282d;
				margin-right: 5px;
				margin-bottom: 2px;
			}

			.question {
				display: inline-block;
			}

			.answer {
				padding-left: 10px;
				color: #8c8989;
				margin-top: 8px;
			}
		}
	}
}

.recommend {
	margin-top: 30px;
	padding-top: 15px;
	background-color: #fff;
}

.popup {
	padding: 15px;

	.top {
		display: flex;
		img {
			display: block;
			width: 88px;
			height: 88px;
		}

		.text {
			padding: 15px;
			.price {
				color: #b4282d;
			}
			.quant {
				margin-top: 20px;
			}
		}
	}

	.quantity {
		margin-top: 12px;
		padding-bottom: 12px;
	}

	.stepper {
		padding-bottom: 15px;
	}
}

</style>
