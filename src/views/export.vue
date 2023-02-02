<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="exportXlsx">导出Excel</el-button>
            </div>
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sno" label="学号"></el-table-column>
                <el-table-column prop="class" label="班级"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts" name="export">
import { ref } from 'vue';

interface TableItem {
    id: number;
    name: string;
    sno: string;
    class: string;
    age: string;
    sex: string;
}

const tableData = ref<TableItem[]>([]);
// 获取表格数据
const getData = () => {
    tableData.value = [
        {
            id: 1,
            name: '小明',
            sno: 'S001',
            class: '一班',
            age: '10',
            sex: '男',
        },
        {
            id: 2,
            name: '小红',
            sno: 'S002',
            class: '一班',
            age: '9',
            sex: '女',
        },
    ];
};

</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #f56c6c;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
