<template>
	<div class="header_tags" v-if="_tagStore.show">
		<ul>
			<li
				class="tags_li"
				v-for="(item, index) in _tagStore.list"
				:class="{ active: isActive(item.path) }"
				:key="index"
			>
				<router-link :to="item.path" class="tags_li_title">{{ item.title }}</router-link>
				<el-icon @click="closeTags(index)"><Close /></el-icon>
			</li>
		</ul>
		<div class="tags_close_box">
			<el-dropdown @command="handleTags">
				<el-button size="small" type="primary">
					标签选项
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu size="small">
						<el-dropdown-item command="other">关闭其他</el-dropdown-item>
						<el-dropdown-item command="all">关闭所有</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import { tagStore } from '@store/tags';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isActive = (path: string) => {
	return path === route.fullPath;
};

const _tagStore = tagStore();
// 关闭单个标签
const closeTags = (index: number) => {
	const delItem = _tagStore.list[index];
	_tagStore.delTagsItem(index);
	const item = _tagStore.list[index] ? _tagStore.list[index] : _tagStore.list[index - 1];
	if (item) {
		delItem.path === route.fullPath && router.push(item.path);
	} else {
		router.push('/');
	}
};

// 设置标签
const setTags = (route: any) => {
	const isExist = _tagStore.list.some(item => {
		return item.path === route.fullPath;
	});
	if (!isExist) {
		if (_tagStore.list.length >= 8) _tagStore.delTagsItem(0);
		_tagStore.setTagsItem({
			name: route.name,
			title: route.meta.title,
			path: route.fullPath
		});
	}
};
setTags(route);
onBeforeRouteUpdate(to => {
	setTags(to);
});

// 关闭全部标签
const closeAll = () => {
	_tagStore.clearTags();
	router.push('/');
};
// 关闭其他标签
const closeOther = () => {
	const curItem = _tagStore.list.filter(item => {
		return item.path === route.fullPath;
	});
	_tagStore.closeTagsOther(curItem);
};
const handleTags = (command: string) => {
	command === 'other' ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// _tagStore.closeCurrentTag({
//     $router: router,
//     $route: route
// });
</script>

<style lang="scss" scoped>
.header_tags {
	position: relative;
	height: 42px;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 5px 10px #ddd;
	padding: 0 30px;
	ul {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.tags_li {
		display: flex;
		align-items: center;
		float: left;
		border-radius: 4px;
		font-size: 12px;
		overflow: hidden;
		cursor: pointer;
		border: 1px solid #e9eaec;
		background: #fff;
		padding: 4px 8px;
		padding-left: 10px;
		color: #666;
		-webkit-transition: all 0.3s ease-in;
		-moz-transition: all 0.3s ease-in;
		transition: all 0.3s ease-in;
		margin-right: 8px;
	}
	.tags_li.active {
		color: #fff;
		border: 1px solid #409EFF;
		background-color: #409EFF;
		.tags_li_title {
			color: #fff;
		}
	}
	.tags_li:not(.active):hover {
		background: #f8f8f8;
	}

	.tags_li_title {
		float: left;
		max-width: 80px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 5px;
		color: #666;
	}

	.tags_close_box {
		position: absolute;
		right: 30px;
		top: 50%;
		transform: translateY(-50%);
		box-sizing: border-box;
		width: 110px;
		height: 30px;
		background: #fff;
		z-index: 10;
	}
}






</style>
