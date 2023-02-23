<template>
	<div class="location">
		<van-nav-bar
			title="location"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<van-search v-model.trim="value" placeholder="请输入搜索关键词"/>

		<ul>
			<li class="prompt"
			    @click="handleClick(item)"
			    v-for="(item, index) in tips"
			    :key="item.id">
				{{ item.name }}
			</li>
		</ul>

		<div id="container"></div>
	</div>
</template>

<script>
export default {
	name: 'Location',
	data() {
		return {
			value: '',
			tips: '',
			pos: [],
		}
	},
	methods: {
		onClickLeft() {
			this.$router.replace('/home')
		},
		handleClick(item) {
			this.pos[0] = item.location.lng
			this.pos[1] = item.location.lat
			console.log(this.pos)
			let map = new AMap.Map('container', {
				zoom: 17,//级别
				center: this.pos
			})
			this.$router.push('/home')
			this.$store.state.address = item.name
			this.$store.state.pos = this.pos
		}
	},
	watch: {
		value(keyword, old) {
			let that = this
			AMap.plugin('AMap.AutoComplete', function () {
				var autoOptions = {
					//city 限定城市，默认全国
					city: '全国'
				};
				// 实例化AutoComplete
				var autoComplete = new AMap.AutoComplete(autoOptions);
				// 根据关键字进行搜索
				autoComplete.search(keyword, function (status, result) {
					// 搜索成功时，result即是对应的匹配数据
					console.log(result);
					that.tips = result.tips
				})
			})
		}
	},
	mounted() {
		let map = new AMap.Map('container', {
			zoom: 6,//级别
			center: this.$store.state.pos
		})
	}
};
</script>

<style lang="scss" scoped>
.prompt {
	width: 100%;
	height: 30px;
	padding: 5px 10px;
	background-color: #fff;
}

#container {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 200px;
}
</style>
