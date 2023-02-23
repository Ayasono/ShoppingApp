<template>
    <div class="NewGoods">
		<ul>
			<li v-for="item in newGoodsData" :key="item.id" @click="jumpToDetail(item.id)">
				<img :src="item.list_pic_url" alt="none">
				<div class="title">{{ item.name }}</div>
				<div class="desc">{{ item.goods_brief }}</div>
				<div class="price"> ¥{{ item.retail_price }}</div>
			</li>
		</ul>
    </div>
</template>

<script>
    export default {
        name: 'Newgoods',
	    data() {
			return {
			}
	    },
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
		    }
	    },
	    props: ['newGoodsData'],
    };
</script>

<style lang="scss" scoped>
	@mixin text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.NewGoods {
		background-color: #fff;
		width: 100%;
		height: 200px;
		color: black;
		overflow-x: scroll;
		overflow-y: hidden;

		ul {
			display: flex;
			li {
				box-sizing: border-box;
				width: 5.333rem  /* 200/37.5 */;
				height: 6.667rem  /* 250/37.5 */;
				padding-left: 0.533rem  /* 20/37.5 */;
				padding-right: 0.533rem  /* 20/37.5 */;
				border-right: rgb(241, 241, 241) 1px solid;
				img {
					width: 2.933rem  /* 110/37.5 */;
					height: 2.667rem  /* 100/37.5 */;
				}
				.title {
					margin-bottom: 0.427rem  /* 16/37.5 */;
					font-weight: bold;
					font-size: 0.4rem  /* 15/37.5 */;
					width: 2.667rem  /* 100/37.5 */;
					@include text-overflow
				}

				.desc {
					font-size: 0.32rem  /* 12/37.5 */ ;
					color: #7b8792;
					width: 2.667rem  /* 100/37.5 */;
					@include text-overflow
				}

				.price {
					margin-top: 0.427rem  /* 16/37.5 */;
					color: rgb(154, 72, 78);
				}
			}
		}
	}
</style>