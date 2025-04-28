<template>
    <div class="container">
        <el-card class="box-card">
            <div class="top-box">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                    <el-form-item label="地区" prop="">
                        <el-cascader v-model="selectedOptions" :options="regionData" :props="cascaderProps"
                            placeholder="请选择省/市/区"></el-cascader>
                    </el-form-item>
                    <el-form-item label="学校名称" prop="">
                        <el-input size="small" v-model="queryParams.vcSchool" placeholder="请输入学校名称" clearable />
                    </el-form-item>
                    <el-form-item label="办学性质" prop="">
                        <el-select v-model="queryParams.vcNature" size="small" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="Search" @click="handleQuery">搜索</el-button>
                        <el-button type="primary" size="small" icon="Search" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="nId" label="序号" align="center"></el-table-column>
                <el-table-column prop="vcCity" label="城市" align="center"></el-table-column>
                <el-table-column prop="vcCounty" label="区县" align="center"></el-table-column>
                <el-table-column prop="vcSchool" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="nScore" label="分数" align="center"></el-table-column>
                <el-table-column prop="vcNature" label="办学性质" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
                <el-pagination :current-page="queryParams.nPageIndex" :page-sizes="[10, 20, 50, 100, 400, 1000]"
                    :page-size="queryParams.nPageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="totalRowNum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </el-card>
        <el-dialog title="新增学校分数线" :visible.sync="addForm.dialog" :close-on-click-modal="false" width="500px">
            <el-form ref="ruleForm" :model="addForm.form">
                <el-form-item label="地区" prop="">
                    <el-cascader v-model="addForm.selectedOptions" :options="regionData" :props="cascaderProps"
                        placeholder="请选择省/市/区"></el-cascader>
                </el-form-item>
                <el-form-item label="办学性质" prop="">
                    <el-select v-model="addForm.form.vcNature" placeholder="请选择">
                    <el-option label="公办" value="公办"></el-option>
                    <el-option label="民办" value="民办"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="学校名称" prop="vcSchool">
                    <el-input size="small" v-model="addForm.form.vcSchool" placeholder="请输入学校名称" style="width: 240px;"
                        clearable />
                </el-form-item>
                <el-form-item prop="nScore" label="分数线">
                    <el-input-number v-model="addForm.form.nScore" :min="0" size="small" />
                </el-form-item>
                <el-form-item style="width:100%;">
                    <div style="display:flex;justify-content: flex-end;margin-right: 10px;margin-bottom: -30px">
                        <el-button size="medium" style="margin-top:10px;" @click="handleCancel()">
                            取消
                        </el-button>
                        <el-button size="medium" style="margin-left:10px;margin-top:10px;" type="primary"
                            @click="handleAddClick()">
                            确定
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="修改学校分数线" :visible.sync="editForm.dialog" :close-on-click-modal="false" width="500px">
            <el-form ref="ruleForm" :model="editForm.form" >
                <el-form-item prop="nScore" label="分数线">
                    <el-input-number v-model="editForm.form.nScore" :min="0" size="small" />
                </el-form-item>
                <el-form-item style="width:100%;">
                    <div style="display:flex;justify-content: flex-end;margin-right: 10px;margin-bottom: -30px">
                        <el-button size="medium" style="margin-top:10px;" @click="editForm.dialog=false">
                            取消
                        </el-button>
                        <el-button size="medium" style="margin-left:10px;margin-top:10px;" type="primary" @click="handleEditClick()">
                            确定
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>   
    </div>
</template>

<script>
import { QuerySchoolScore, GetCityCounty,AddSchoolScore,DeletSchoolScore,UpdateSchoolScore } from '@/api';
import { Cascader } from 'element-ui';
export default {
    name: 'exploreList',
    data() {
        return {
            tableData: [],
            queryParams: {
                nPageIndex: 1,
                nPageSize: 10,
                vcProvince: '',
                vcCity: '',
                vcCounty: '',
                vcSchool: '',
                vcNature: '',
                dtStartTime: '',
                dtEndTime: '',
                date: [],
            },
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '公办',
                label: '公办'
            }, {
                value: '民办',
                label: '民办'
            }],
            totalRowNum: 0,
            loading: false,
            selectedOptions: [], // 绑定的选择值
            cascaderProps: {
                expandTrigger: 'hover',
                checkStrictly: true, // 是否允许选择任意一级
                value: 'value',
                label: 'label',
                children: 'children'
            },
            regionData: [{
                value: '湖南省',
                label: '湖南省',
                children: []
            }],
            addForm:{
                dialog:false,
                selectedOptions:[],
                form:{
                    nScore:0
                }
            },
            editForm:{
                dialog:false,
                form:{
                    nScore:0
                }
            }
        }
    },
    mounted() {
        this.timeDate()
        this.handleCityCounty()
        this.handleQuery()
    },
    methods: {
        handleCityCounty() {
            GetCityCounty().then(response => {
                let res = response.data
                if (res.code == 0) {
                    console.log(JSON.stringify(res.data))
                    this.regionData[0].children = res.data.map(r => ({
                        value: r.vcCity,
                        label: r.vcCity,
                        children: r.lgtCounty.map(t => ({
                            value: t,
                            label: t
                        }))
                    }));
                }
            })


        },
        handleQuery() {
            if (!this.queryParams.dtStartTime || !this.queryParams.dtEndTime) {
                this.$message({
                    message: '请选择创建时间',
                    type: 'warning'
                });
                return
            }
            if (this.selectedOptions.length > 0) {
                this.queryParams.vcProvince = this.selectedOptions[0];
                this.queryParams.vcCity = this.selectedOptions[1];
                this.queryParams.vcCounty = this.selectedOptions[2];
            }

            QuerySchoolScore(this.queryParams).then(response => {
                let res = response.data
                console.log(res)
                if (res.code == 0) {
                    this.tableData = res.data.data
                    this.totalRowNum = res.data.dataCount
                }
            })
        },
        dateChange(e) {
            console.log(e)
            if (e && e.length > 0) {
                this.queryParams.dtStartTime = e[0]
                this.queryParams.dtEndTime = e[1]
            } else {
                this.queryParams.dtStartTime = ''
                this.queryParams.dtEndTime = ''
                this.queryParams.date = []
            }
        },
        handleSizeChange(val) {
            this.queryParams.nPageSize = val
            this.queryParams.nPageIndex = 0;
            this.handleQuery()
        },
        handleCurrentChange(val) {
            this.queryParams.nPageIndex = val
            this.handleQuery()
        },
        timeDate() {
            let date = new Date();
            this.queryParams.dtEndTime = this.timestampToYearMonthDate(date.getTime())
            this.queryParams.dtStartTime = this.timestampToYearMonthDate(date.setTime(date.getTime() - 3600 * 1000 * 24 * 7));
            this.queryParams.date = [this.queryParams.dtStartTime, this.queryParams.dtEndTime]
        },
        timestampToYearMonthDate(timestamp) {
            let date = new Date(timestamp);
            let year = date.getFullYear();
            let month = date.getMonth() + 1; // 月份从0开始，需要加1
            let day = date.getDate();
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        },
        handleCancel(){
            this.addForm.form={};
            this.addForm.dialog = false;
        },
        handleAdd() {
            this.addForm.form={};
            this.addForm.dialog = true
        },
        handleAddClick(){
            if (this.addForm.selectedOptions.length > 0) {
                this.addForm.form.vcProvince = this.addForm.selectedOptions[0];
                this.addForm.form.vcCity = this.addForm.selectedOptions[1];
                this.addForm.form.vcCounty = this.addForm.selectedOptions[2];
            }
            AddSchoolScore(this.addForm.form).then(response =>{
                let res = response.data
                console.log(res)
                if(res.code==0){
                    this.addForm.dialog = false
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.handleQuery()
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }   
            })
        },
        handleEdit(index, row) {
            this.editForm.form.nScore =row.nScore;
            this.editForm.form.nId =row.nId;
            this.editForm.dialog = true
        },
        handleEditClick(){
            UpdateSchoolScore(this.editForm.form).then(response =>{
                let res = response.data
                if(res.code==0){
                    this.editForm.dialog = false
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.handleQuery()
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }   
            })
        },
        handleDelete(index, row) {
            let that = this
            this.$confirm('确定删除此数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DeletSchoolScore(row.nId).then(response => {
                    let res = response.data
                    console.log(res)
                    if (res.code == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        that.handleQuery()
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            }).catch(() => {

            });
        },
    }

}
</script>
<style lang="less" scoped>
.container {
    margin: 20px;
    width: 100%;
}
</style>