<template>
	<div>
		<div class="container">
			<div class="filter_box">
				<div class="left">
					<el-input v-model="parmas.search" class="search" placeholder="关键字搜索" :suffix-icon="Search" />
				</div>
				<div class="right">
					<el-button type="primary" class="green_button">新增</el-button>
					<el-button type="primary" class="danger_button">批量操作</el-button>
				</div>
			</div>
			<el-empty description="暂无数据" v-if="!isData" />
			<div class="table_container" v-loading="loading" v-else>
				<el-table :data="tableData" border :max-height="innerHeight-400" class="table_list" >
					<el-table-column label="序号" type="index" width="120" />
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column prop="created_at" label="注册时间">
						<template #default="scope">
							<span>{{moment(scope.row?.created_at).format('YYYY-MM-DD HH:mm') }}</span>
						</template> 
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="200" >
						<template #default="scope">
							<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button type="primary" size="small" class="danger_button" @click="handleDelete(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				
			</div>
		</div>
		<div class="pagination">
			<el-pagination
				prev-text="上一页"
				next-text="下一页"
				background
				:page-sizes="[10, 20, 30, 40]"
				:current-page="parmas.page"
				:page-size="parmas.page_size"
				layout="prev, pager, next, sizes, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ceshiApi } from '@api/list'
import moment from 'moment';


const _ceshiApi = new ceshiApi()
const parmas = reactive({
	search: '',
	page: 1,
	page_size: 10,
})

const tableData = ref<Array<any>>([])
const total = ref<number>(0)
const loading = ref<boolean>(false)
const isData = ref<boolean>(true)
const innerHeight = ref(window.innerHeight)

const getInfo = () => {
	loading.value = true
	_ceshiApi.list(parmas, (res: any) => {
		if(!res.total) return isData.value = false
		tableData.value = res.data
		total.value = res.total
		loading.value = false
	}, (err: any) => {
		ElMessage.error(err)
	})
}
const handleSizeChange = (val: any) => {
	parmas.page = 1
	parmas.page_size= val
}
const handleCurrentChange = (val :any) => {
	parmas.page = val
}
watchEffect(() => {
	getInfo()
})

const handelFn = () => {
	ElMessage({
		message: '修改成功',
		type: 'success',
		duration: 2000,
  	})
}

</script>

<style lang="scss" scoped>

</style>
