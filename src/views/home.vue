<template>
	<v-header />
	<v-sidebar />
	<div class="right_con" :class="{ 'content_collapse': _sidebarStore.collapse }">
		<v-tags></v-tags>
		<div class="info">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="_tagStore.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import { sidebarStore } from '@store/sidebar';
import { tagStore } from '@store/tags';
import vHeader from '@components/header.vue';
import vSidebar from '@components/sidebar.vue';
import vTags from '@/components/routerTags.vue';
const _sidebarStore = sidebarStore();
const _tagStore = tagStore();

</script>

<style lang="scss" scoped>

.right_con {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
	.info {
		width: auto;
		height: 100%;
		padding: 10px;
		overflow-y: scroll;
		box-sizing: border-box;
	}
}

</style>
