<template>
	<div class="addAddress" ref="father">
		<van-nav-bar
			title="地址管理"
			left-text="后退"
			left-arrow
			@click-left="onClickLeft"
		/>

		<!--		<van-address-edit
					:area-list="areaList"
					show-postal
					show-set-default
					show-search-result
					:search-result="searchResult"
					:area-columns-placeholder="['请选择', '请选择', '请选择']"
					@save="onSave"
					@change-detail="onChangeDetail"
				/>-->
		<div class="form">
			<input type="text" placeholder="姓名" v-model="name">
			<input type="text" placeholder="手机号码" v-model="telNumber">
			<input type="text" placeholder="省份、城市、市区" v-model="area" @click="showSelections">
			<input type="text" placeholder="详细地址" v-model="detailAddress">
		</div>

		<van-popup v-model="show" position="bottom">
			<van-area title="请选择" @change="onChange" @confirm="confirmed()" :area-list="areaList" v-model="value"/>
		</van-popup>

		<div class="checkbox">
			<input id="default" type="checkbox" v-model="isDefault"> 设置为默认地址
		</div>

		<div id="submit" @click="submit">
			提交
		</div>
	</div>
</template>

<script>
import {areaList} from '@vant/area-data';
import saveAddress from "@/api/address/saveAddress";
import getCertainAddress from "@/api/address/getCertainAddress";
import {Toast} from "vant";

export default {
	name: 'Addaddress',
	data() {
		return {
			areaList,
			searchResult: [],
			name: '',
			telNumber: '',
			area: '北京市 北京市 东城区',
			detailAddress: '',
			show: false,
			isDefault: false,
			value: '',
		}
	},
	methods: {
		onChange(instance, v, index){
			this.area = ''
			v.map(el => {
				this.area+=el.name + ' '
			})
			console.log(this.area)
		},
		onClickLeft() {
			this.$router.back()
		},
		onSave(content) {
			console.log(content)
			let addressId = this.$route.query.id ? this.$route.query.id : ''
			let address = content.province + content.county + content.ciry
			saveAddress({
				address,
				addressId,
				checked: content.isDefault,
				detailadress: content.addressDetail,
				openId: localStorage.getItem('openId'),
				telNumber: content.tel,
				userName: content.name,
			})
				.then(res => {
					if (res.data) {
						Toast('保存成功')
						this.$router.back()
					}
					Toast('保存失败')
				})
		},
		submit() {
			let addressId = this.$route.query.id ? this.$route.query.id : ''
			console.log(addressId)
			saveAddress({
				address: this.area,
				checked: this.isDefault,
				detailadress: this.detailAddress,
				openId: localStorage.getItem('openId'),
				telNumber: this.telNumber,
				userName: this.name,
				addressId,
			})
				.then(res => {
					if (res.data) {
						Toast('保存成功')
						this.$router.back()
					}
					Toast('保存失败')
				})
		},
		confirmed() {
			this.show=false
		},
		onChangeDetail(val) {
			if (val) {
				this.searchResult = [
					{
						name: '黄龙万科中心',
						address: '杭州市西湖区',
					},
				];
			} else {
				this.searchResult = [];
			}
		},
		setHeight() {
			this.$refs.father.style.height = window.screen.height + 'px'
			console.log(this.$refs.father.style.height)
		},
		showSelections() {
			this.show = true
		},
		init() {
			let id = this.$route.query.id
			if (id) {
				getCertainAddress({id})
					.then(res => {
						({name: this.name, user_id: this.telNumber, address: this.area, address_detail: this.detailAddress, is_default: this.isDefault} = res.data)
						console.log(res)
					})
			}
		}
	},
	mounted() {
		this.setHeight()
		this.init()
	}
};
</script>

<style lang="scss" scoped>
.addAddress {
	background-color: #fff;

	.form {
		width: 100%;
		background-color: #fff;

		input {
			margin: 0 auto;
			display: block;
			width: 85%;
			height: 1.467rem /* 55/37.5 */
		;
			border: none;
			border-bottom: #eee 1px solid;
			padding: 0 15px;
			font-size: 14px;
			color: #323233;

			&::-webkit-input-placeholder {
				color: rgb(200, 201, 204);
			}
		}
	}

	.checkbox {
		margin: 20px 15px;
		padding: 5px 0;
		display: flex;
		align-items: center;
	}

	#default {
		width: 18px;
		height: 18px;
		box-sizing: border-box;
		margin-right: 10px;
		font-size: .8em;
		border: 0.02667rem solid #c8c9cc;
		border-radius: 0;
		-webkit-transition-duration: .2s;
		background: #b4282d;
		color: #b4282d;
		transition-duration: .2s;
		-webkit-transition-property: color, border-color, background-color;
		transition-property: color, border-color, background-color;
	}

	#submit {
		width: 100%;
		height: 1.333rem /* 50/37.5 */
	;
		background-color: #b4282d;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 15px;
	}
}
</style>
