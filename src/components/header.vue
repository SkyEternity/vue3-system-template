<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse_btn" @click="collapseChage">
			<el-icon v-if="_sidebarStore.collapse"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</div>
		<div class="logo">后台管理系统</div>
		<div class="header_r">
			<div class="header_user_con">
				<!-- 消息中心 -->
				<div class="btn_bell" @click="router.push('/tabs')">
					<el-tooltip
						effect="dark"
						:content="message ? `有${message}条未读消息` : `消息中心`"
						placement="bottom"
					>
						<i class="el-icon-lx-notice"></i>
					</el-tooltip>
					<span class="btn_bell_badge" v-if="message"></span>
				</div>
				<!-- 用户头像 -->
				<el-avatar class="user_avator" :size="30" :src="imgurl" />
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ username }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
								<el-dropdown-item>项目仓库</el-dropdown-item>
							</a>
							<el-dropdown-item command="user">个人中心</el-dropdown-item>
							<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { sidebarStore } from '@store/sidebar';
// import { sidebarStore } from '@/';
import { useRouter } from 'vue-router';
import imgurl from '../assets/img/img.jpg';


const username: string | null = localStorage.getItem('ms_username');
const message: number = 2;

const _sidebarStore = sidebarStore();
// 侧边栏折叠
const collapseChage = () => {
	// sidebar.handleCollapse();
};
onMounted(() => {
	if (document.body.clientWidth < 1500) {
		collapseChage();
	}
});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
	if (command == 'loginout') {
		localStorage.removeItem('ms_username');
		router.push('/login');
	} else if (command == 'user') {
		router.push('/user');
	}
};
</script>
<style lang="scss" scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
	background-color: #242f42;
	.collapse_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		float: left;
		padding: 0 21px;
		cursor: pointer;
	}
	.logo {
		float: left;
		width: 250px;
		line-height: 70px;
	}
	.header_r {
		float: right;
		padding-right: 50px;
	}
	.header_user_con {
		display: flex;
		height: 70px;
		align-items: center;
	}
	.btn-fullscreen {
		transform: rotate(45deg);
		margin-right: 5px;
		font-size: 24px;
	}
	.btn_bell,
	.btn-fullscreen {
		position: relative;
		width: 30px;
		height: 30px;
		text-align: center;
		border-radius: 15px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.btn_bell_badge {
		position: absolute;
		right: 4px;
		top: 0px;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #f56c6c;
		color: #fff;
	}
	.btn_bell .el-icon-lx-notice {
		color: #fff;
	}
	.user-name {
		margin-left: 10px;
	}
	.user_avator {
		margin-left: 20px;
	}
	.el-dropdown-link {
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.el-dropdown-menu__item {
		text-align: center;
	}

}

</style>
