<template>
	<div class="cart">
		<van-nav-bar
			title="购物车"
			left-text="后退"
			left-arrow
			@click-left="onClickLeft"
		/>

		<van-swipe-cell v-for="item in cartList" :key="item.id">
			<van-cell class="item-cell" :border="false">
				<!--				!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!HAVE NOT FIGURED OUT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
				<van-checkbox class="checker" checked-color="rgb(158, 54, 49)" v-model="item.isSelected"/>

				<div class="item-pic">
					<img :src="item.list_pic_url" alt="">
				</div>

				<div class="item-detail">
					<div class="item-name">
						{{ item.goods_name }}
					</div>

					<div class="price">
						¥ {{ item.retail_price }}
					</div>
				</div>

				<div class="quant">
					* {{ item.number }}
				</div>
			</van-cell>
			<template #right>
				<van-button @click="deleteItem(item.id)" square text="删除" type="danger" class="delete-button"/>
			</template>
		</van-swipe-cell>

		<van-submit-bar :price="totalPrice * 100" button-text="提交订单" :style="{bottom: '50px'}" @submit="onSubmit">
			<van-checkbox checked-color="rgb(158, 54, 49)" v-model="isAllChecked">全选</van-checkbox>
		</van-submit-bar>
	</div>
</template>

<script>
import getCart from "@/api/cart/getCart/getCart";
import deleteCartItem from "@/api/cart/deleteCart";
import {Toast} from "vant";

export default {
	name: 'Cart',
	data() {
		return {
			cartList: [],
		}
	},
	methods: {
		onSubmit() {
			if (this.cartList.filter(el => el.isSelected).length === 0) return Toast('请选择商品')
			let filteredList = this.cartList.filter(el => el.isSelected)
			filteredList = JSON.stringify(filteredList)

			this.$router.push({
				path: '/cart/orderPayment', query:
					{
						totalPrice: this.totalPrice,
						cartList: filteredList,
					}
			})
		},
		onClickLeft() {
			this.$router.back()
		},
		onSelectItem(e) {
			// has been deprecated @no longer using sprite anymore...
			this.isSelected = !this.isSelected
			!this.isSelected ? e.target.style.transform = `translateY(-${25.3 * 4}px)` : e.target.style.transform = `translateY(-${25.3 * 5}px)`
		},
		deleteItem(id) {
			deleteCartItem(id)
				.then(res => {
					Toast('删除成功！')
				})
			this.init()
		},
		init() {
			getCart(localStorage.getItem('openId'))
				.then(res => {
					res.data.forEach(el => el.isSelected = false)
					this.cartList = res.data
					console.log(this.cartList)
				})
		},
	},
	computed: {
		totalPrice: {
			get() {
				return this.cartList.reduce((acc, curr) => {
					// return curr.isSelected ? acc += curr.retail_price * curr.number : acc
					if (curr.isSelected) {
						return acc += curr.retail_price * curr.number
					} else {
						return acc
					}
				}, 0)
			}
		},
		isAllChecked: {
			get() {
				return this.cartList.every(el => el.isSelected)
			},
			set(v) {
				this.cartList.forEach(el => el.isSelected = v)
			}
		}
	},
	created() {
		this.$store.state.active = 3
		this.init()
	}
};
</script>

<style lang="scss" scoped>
@mixin flex-center() {
	display: flex;
	justify-content: center;
	align-items: center;
}

.cart {
	.delete-button {
		height: 100%;
	}

	.item-cell {
		height: 104px;

		> div {
			/*			display: grid;
						grid-template-rows: 1fr;
						grid-template-columns: 1fr 1fr 1fr 1fr;
						align-items: center;*/
			display: flex;
			align-items: center;

		}

		.checker {
			overflow: hidden;
			width: 20px;
			height: 20px;

			> img {
				width: 20px;
				transform: translateY(calc(-25.3 * 5px));
			}
		}

		.item-pic {
			width: 62px;
			height: 62px;
			padding-left: 12px;

			img {
				width: 62px;
				height: 62px;
			}
		}

		.item-detail {
			font-size: 12px;
			padding-left: 12px;
			width: 100px;
		}

		.quant {
			display: flex;
			justify-content: right;
			align-items: center;
			flex-grow: 1;
			height: 100%;
		}
	}
}
</style>
