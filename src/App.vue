<template>
	<div id="app">
		<h1 @click="foo" >{{arr}}</h1>
		<keep-alive include="category">
			<router-view></router-view>
		</keep-alive>
		<!-- <router-link to="/home">home</router-link>wd -->
		<van-tabbar
			v-model="$store.state.active"
			v-show="isShown"
			active-color="rgb(171, 43, 43)"
		>
			<van-tabbar-item
				icon="home-o"
				@click="jumpToHome"
				active-color="rgb(171, 43, 43)"
				>首页
			</van-tabbar-item>
			<van-tabbar-item
				icon="search"
				@click="jumpToTheme"
				active-color="rgb(171, 43, 43)"
				>专题
			</van-tabbar-item>
			<van-tabbar-item
				icon="friends-o"
				@click="jumpToCategory"
				active-color="rgb(171, 43, 43)"
				>分类
			</van-tabbar-item>
			<van-tabbar-item
				icon="setting-o"
				@click="jumpToCart"
				active-color="rgb(171, 43, 43)"
				>购物车
			</van-tabbar-item>
			<van-tabbar-item
				icon="setting-o"
				@click="jumpToMine"
				active-color="rgb(171, 43, 43)"
				>我的
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShown: "true",
				arr: []
			};
		},
		methods: {
			foo() {
				this.arr[0]='111'
				console.log(this.arr)
			},
			jumpToHome() {
				this.$router.replace({
					path: "/home",
					query: {},
				});
			},
			jumpToTheme() {
				this.$router.replace({
					path: "/theme",
				});
			},
			jumpToCategory() {
				this.$router.replace({
					path: "/category",
				});
			},
			jumpToCart() {
				this.$router.replace({
					path: "/cart",
				});
			},
			jumpToMine() {
				this.$router.replace({
					path: "/mine",
				});
			},
			resetRootFontSize() {
				document.documentElement.fontSize = window.screen.width / 10 + "px";
			},
		},
		watch: {
			$route(to, from) {
				const list = ["home", "theme", "category", "cart", "mine"];
				this.isShown = list.includes(to.name);
			},
		},
		created() {
			// reset font size
			this.resetRootFontSize();
			let userInfo = {
				openId: "18268455052",
				nickName: "赵六",
				avatarUrl:
					"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
			};
			let openId = userInfo.openId;
			localStorage.setItem("userInfo", JSON.stringify(userInfo));
			localStorage.setItem("openId", openId);
		},
	};
</script>

<style lang="scss">
	body {
		background-color: rgb(241, 241, 241);
	}
</style>
