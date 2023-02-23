<template>
	<div class="advice">
		<van-nav-bar
			title="意见"
			left-text="后退"
			left-arrow
			@click-left="onClickLeft"
		/>

		<div class="complaints">
			<div class="title">
				意见与反馈
			</div>

			<van-field
				v-model="message"
				rows="4"
				autosize
				label="留言"
				type="textarea"
				maxlength="150"
				placeholder="请填写您的意见和反馈"
				show-word-limit
			/>
			<van-field v-model="tel" type="tel" label="联系方式" placeholder="邮箱/手机号/微信号"
			/>
		</div>

		<van-button @click="sendComplaints" id="btn" type="primary" color="rgb(166, 54, 51)" size="large">提交</van-button>
	</div>
</template>

<script>
import sendComplaints from "@/api/complaints";
import {Toast} from "vant";

export default {
	name: 'Advice',
	data() {
		return {
			message: '',
			tel: '',
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back()
		},
		sendComplaints() {
			sendComplaints({
				content: this.message,
				name: localStorage.getItem('openId'),
				openId: localStorage.getItem('openId'),
				phone: this.tel
			})
				.then(res => {
					if (res.data) {
						Toast('发送成功')
					} else {
						Toast('发送失败')
					}
				})
		}
	}
};
</script>

<style lang="scss" scoped>
.advice {
	height: 17.787rem  /* 667/37.5 */;
	background-color: #fff;
}
.title {
	background-color: #fff;
	height: 18px;
	line-height: 0.48rem /* 18/37.5 */
;
	padding: 6px 15px;
}

#btn {
	display: block;
	margin: 50px auto;
	width: 90%;
}
</style>
