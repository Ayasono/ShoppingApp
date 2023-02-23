<template>
	<div class="new-brand" :style="{ backgroundColor: color }">
		<div class="title">
			<slot name="title"></slot>
		</div>

		<a>
			<div class="check-all" :style="{ backgroundColor: btncolor }">
				<p :style="{ color: textcolor }">
					<router-link :to="{
						name: 'newgoods',
						params: {
							type
						}
					}" tag="div">
						<slot name="checkAll"></slot>
					</router-link>
				</p>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	name: 'Banner',
	props: ['color', 'btncolor', 'textcolor', 'type']
};
</script>

<style scoped lang="scss">
.new-brand {
	position: relative;
	margin: 10px 0;

	width: 100%;
	height: 3.253rem /* 122/37.5 */
;

	text-align: center;

	.title {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);

		font-size: 16px;
		color: rgb(160, 160, 181);
	}

	.check-all {
		position: absolute;
		top: 75px;
		left: 50%;
		transform: translateX(-50%);

		width: 2.4rem /* 90/37.5 */
	;
		height: 0.64rem /* 24/37.5 */
	;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
