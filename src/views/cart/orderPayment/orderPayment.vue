<template>
	<div class="orderPayment">
		<van-nav-bar
			title="支付"
			left-text="后退"
			left-arrow
			@click-left="onClickLeft"
		/>

		<div class="top-img">
		</div>

		<div class="address" @click="onClickAddress">
			请选择收货地址
		</div>

		<div class="cart-total">
			<ul>
				<li>
					<div class="left">
						商品合计
					</div>

					<div class="right">
						¥ {{ this.cart.totalPrice }}
					</div>
				</li>
				<li>
					<div class="left">
						运费
					</div>

					<div class="right">
						无运费
					</div>
				</li>
				<li>
					<div class="left">
						优惠券
					</div>

					<div class="right">
						暂无
					</div>
				</li>
			</ul>
		</div>

		<div class="item-review">
			<div v-for="item in items" :key="item.id" class="item-card">
				<img :src="item.list_pic_url" alt="">
				<div class="detail">
					<div class="name">
						{{ item.goods_name }}
					</div>

					<div class="price">
						¥ {{ item.retail_price }}
					</div>
				</div>
				<div class="number">
					x {{ item.number }}
				</div>
			</div>
		</div>

		<div class="bottom">
			<div class="left">
				实付：¥ {{ cart.totalPrice }}
			</div>

			<div class="right">
				支付
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Orderpayment',
	data() {
		return {
			cart: {},
			items: '',
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back()
		},
		init() {
			this.cart = {
				totalPrice: this.$route.query.totalPrice,
				selectedItems: this.$route.query.cartList
			}
			this.items = JSON.parse(this.cart.selectedItems)
			console.log(this.items)
		},
		onClickAddress() {
			this.$router.push('/mine/address/edit')
		},
	},
	created() {
		this.init()
	}

};
</script>

<style lang="scss" scoped>
.top-img {
	width: 100%;
	height: 5px;
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png) 0 0 repeat-x #fff;
}

.address {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	height: 2.4rem /* 90/37.5 */
;
	margin-bottom: 15px;
}

.cart-total {
	ul {
		width: 100%;
		background-color: #fff;

		&:nth-last-child {
			border-bottom: white 0 solid;
		}

		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 auto;
			width: 90%;
			height: 50px;
			border-bottom: #eeeeee 1px solid;

			.left {
			}

			.right {
			}
		}
	}
}

.item-review {
	background-color: #fff;
	padding: 0.267rem /* 10/37.5 */
;
	margin-top: 15px;

	.item-card {
		display: flex;
		align-items: center;

		img {
			display: block;
			width: 1.667rem /* 62.5/37.5 */
		;
			height: 1.667rem /* 62.5/37.5 */
		;
		}

		.detail {
			width: 6.933rem /* 260/37.5 */
		;
			height: 62.5px;
			padding-left: 0.267rem /* 10/37.5 */
		;

			.name {
				width: 100%;
				height: 50%;
				margin: 4px 0;
			}

			.price {
				width: 100%;
				height: 50%;
				margin: 4px 0;
			}
		}
	}
}

.bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	padding-left: 10px;
	display: flex;
	background-color: #fff;

	.left {
		display: flex;
		align-items: center;
		flex-grow: 1;
		font-size: 0.347rem /* 13/37.5 */
	;
	}

	.right {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: .38667rem;

		width: 3.2rem /* 120/37.5 */
	;
		height: 100%;
		background-color: #b4282d;
	}
}
</style>
