<template>
	<div class="addressManagement">
		<van-nav-bar
			title="地址管理"
			left-text="后退"
			left-arrow
			@click-left="onClickLeft"
		/>

		<van-address-list
			v-model="chosenAddressId"
			:list="list"
			:disabled-list="disabledList"
			disabled-text="以下地址超出配送范围"
			default-tag-text="默认"
			@add="onAdd"
			@edit="onEdit"
		/>
	</div>
</template>

<script>
import getAddressList from "@/api/address/getAddressList";

export default {
	name: 'Addressmanagement',
	data() {
		return {
			chosenAddressId: '1',
			disabledList: [],
			list: [
				{
					id: '1',
					name: '张三',
					tel: '13000000000',
					address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
					isDefault: true,
				},
			],
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back()
		},
		onAdd() {
			this.$router.push('/mine/address/edit')
		},
		onEdit(item, index) {
			console.log(item, index)
			this.$router.push({
				path: '/mine/address/edit',
				query: {
					id: item.id
				}
			})
		},
		init() {
			getAddressList(localStorage.getItem('openId'))
				.then(res => {
					let index = res.data.findIndex(el => el.is_default)
					res.data[index].isDefault = true
					res.data.forEach(el =>{
						el.tel = el.mobile
						// el.address = el.address_detail
					})
					this.list = res.data
					console.log(this.list)
				})
		}
	},
	created() {
		this.init()
	}

};
</script>

<style lang="scss" scoped>

</style>
