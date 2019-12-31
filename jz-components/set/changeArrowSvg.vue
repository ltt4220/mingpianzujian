<template>
	<div class="zm-component-changeSvg">
		<p>图标样式</p>
		<div>
			<div class="zm-component-changeSvg-box1">
				<div class="svg_box" v-html='svgHTML' style="fill: #fff">
				</div>
			</div>
			<p @click='changeSvg'>选择</p>
		</div>
	</div>
</template>
<script>
	export default{
		props:['prop'],
		computed:{
			svgHTML(){
				let id = zmEditor.$store.state.component.selectList[0].id,
				    obj = zmEditor.$store.state.component.selectList[0].settingData.arrowIcon.value.iconClass;
				return obj.replace('<svg',`<svg id=${id} style='width: 72px;height:72px;fill:#fff;'`);
			}
		},
		methods: {
			changeSvg(){
	      zmEditor.$store.commit("changeOtherPaneData", {
	        key: "paneType",
					value: true,
	      });
	      zmEditor.$store.commit("changeOtherPaneData", {
	        key: "paneTitle",
					value: "轮播图标",
				});
				zmEditor.$store.commit("changeOtherPaneData", {
					key: "paneHelpInfo",
					value: "图标样式"
				});
	      zmEditor.$store.commit("changeOtherPaneData", {
					key: "paneMode",
					value: "/set/setArrowStyleSetting.vue"
				});

				this.prop.callback && this.prop.callback();
			},
		}
	}
</script>
<style>
	
	.zm-component-changeSvg{
		padding: 10px 0;
		margin: 0 20px;
		position: relative;
		border-bottom: 1px solid #f2f2f2;
	}
	.zm-component-changeSvg>p{
		width: 71px;
		height: 28px;
		line-height: 28px;
		position: absolute;
		top: 10px;
		font-size: 12px;
		color: #797979;
	}
	.zm-component-changeSvg>div>div{
		margin: 0 auto;
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.zm-component-changeSvg>div>p{
		width: 80px;
		height: 30px;
		margin: 5px auto 0 auto;
		line-height: 30px;
		text-align: center;
		background: #3089d5;
		color: #fff;
		border-radius: 3px;	
		
	}
	.zm-component-changeSvg-box1{
		background: #6895BB;
	}
	.zm-component-changeSvg-box1>div{
		width: 100%;
		height: 100%;
		fill: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.zm-component-changeSvg-box1 .svg_box svg{
		width: 90% !important;
		height: 90% !important;
	}
</style>