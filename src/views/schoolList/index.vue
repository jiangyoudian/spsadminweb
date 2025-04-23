<template>
    <div class="container">
        <el-card class="box-card">
            <div class="top-box">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="学校名称" prop="">
                    <el-input size="small" v-model="queryParams.vcName" placeholder="请输入学校名称" clearable/>
                </el-form-item>
                <el-form-item label="市县" prop="">
                    <el-select v-model="queryParams.vcCity" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in lgtCity"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="星级" prop="">
                    <el-input-number size="small" v-model="queryParams.nStar" :min="0" :max="5" placeholder="请输入星级" clearable/>
                </el-form-item>
                <el-form-item label="是否推荐" prop="">
                        <el-select v-model="queryParams.nStatus" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="Search" @click="handleQuery">搜索</el-button>
                </el-form-item>
                </el-form>
                <el-button
                    size="small"
                    type="primary"
                    :disabled="lgtSchoolId.length==0?true:false"
                    @click="handleSelectionRecommend()">
                    批量推荐
                </el-button>
                <el-button
                    size="small"
                    type="primary"
                    :disabled="lgtSchoolId.length==0?true:false"
                    @click="handleSelectionChangeStar()">
                    批量修改星级
                </el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="80" label="学校编号" align="center"></el-table-column>
                <el-table-column prop="vcName" label="学校名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="vcCity" label="市县" align="center"></el-table-column>
                <el-table-column prop="vcNature" label="性质" align="center"></el-table-column>
                <el-table-column prop="vcCode" label="代码" align="center"></el-table-column>
                <el-table-column prop="vcPeople" label="人数" align="center"></el-table-column>
                <el-table-column prop="vcArea" label="面积" align="center"></el-table-column>
                <el-table-column prop="vcAddress" label="地址" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nStar" label="星级" align="center"></el-table-column>
                <el-table-column prop="nStatus" label="是否推荐" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.nStatus==1?'是':'否' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleRecommend(scope.$index, scope.row)">{{scope.row.nStatus==1?'取消推荐':'推荐'}}</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleChangeStar(scope.$index, scope.row)">修改星级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
                <el-pagination :current-page="queryParams.nPageIndex" :page-sizes="[10, 20, 50, 100, 400, 1000]"
                :page-size="queryParams.nPageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRowNum"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </el-card>
        <el-dialog title="修改星级" :visible.sync="dialog" :close-on-click-modal="false" width="500px">
            <el-form ref="ruleForm" :model="form" :rules="rulesObj">
                <el-form-item prop="nStar" label="星级">
                    <el-input-number v-model="form.nStar" style="width:300px;" :min="0" :max="5" size="small" placeholder="请输入星级" />
                </el-form-item>
                <el-form-item style="width:100%;">
                    <div style="display:flex;justify-content: flex-end;margin-right: 10px;margin-bottom: -30px">
                        <el-button size="medium" style="margin-top:10px;" @click="dialog=false">
                            取消
                        </el-button>
                        <el-button size="medium" style="margin-left:10px;margin-top:10px;" type="primary" @click="handleEnsureClick()">
                            确定
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>   
    </div>
</template>
    
<script>
import { getSchoolList,RecommendedSchool,UpdateSchoolStar } from '@/api';
export default {
    name: 'schoolList',
    data() {
        return {
            tableData: [],
            form: {
                lgtSchoolId: [],
                nStar: '',
            },
            lgtCity:[{
                value: '长沙市',
                label: '长沙市'
            },{
                value: '株洲市',
                label: '株洲市'
            },{
                value: '湘潭市',
                label: '湘潭市'
            },{
                value: '衡阳市',
                label: '衡阳市'
            },{
                value: '邵阳市',
                label: '邵阳市'
            },{
                value: '岳阳市',
                label: '岳阳市'
            },{
                value: '常德市',
                label: '常德市'
            },{
                value: '张家界市',
                label: '张家界市'
            },{
                value: '益阳市',
                label: '益阳市'
            },{
                value: '郴州市',
                label: '郴州市'
            },{
                value: '永州市',
                label: '永州市'
            },{
                value: '娄底市',
                label: '娄底市'
            },{
                value: '湘西土家族苗族自治州',
                label: '湘西土家族苗族自治州'
            },{
                value: '怀化市',
                label: '怀化市'
            }
            ],
            options: [{
                value: 0,
                label: '全部'
            },{
                value: 1,
                label: '推荐'
            }, {
                value: 2,
                label: '不推荐'
            }],
            queryParams: {
                nPageIndex: 1,
                nPageSize: 10,
                vcName: '',
                vcCity:'',
                nStatus:0,
                nStar:0
            },
            totalRowNum: 0,
            multipleSelection: [],
            lgtSchoolId: [],
            dialog: false,
            rulesObj: {
                nStar: [
                    { required: true, message: '星级不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        this.handleQuery()
    },
    methods: {
        handleQuery(){
            getSchoolList(this.queryParams).then(response =>{
                let res = response.data
                console.log(res)
                if(res.code==0){
                    this.tableData = res.data.data
                    this.totalRowNum = res.data.dataCount
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.lgtSchoolId = this.multipleSelection.map((item) => item.nId);
        },
        handleSelectionRecommend(){
            this.$confirm('确定推荐所选数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    lgtSchoolId: this.lgtSchoolId,
                    nStatus: 1,
                }
                RecommendedSchool(params).then(response =>{
                    let res = response.data
                    console.log(res)
                    if(res.code==0){
                        this.$message({
                            message: '提交成功',
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
            }).catch(() => {
            
            });
        },
        handleRecommend(index,row){
            let title = row.nStatus==1?'取消推荐':'推荐'
            this.$confirm('确定'+title+'此数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    lgtSchoolId: [row.nId],
                    nStatus: row.nStatus==1?2:1,
                }
                RecommendedSchool(params).then(response =>{
                    let res = response.data
                    console.log(res)
                    if(res.code==0){
                        this.$message({
                            message: '提交成功',
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
            }).catch(() => {
            
            });
        },
        handleChangeStar(index,row){
            this.form.nStar = row.nStar
            this.form.lgtSchoolId = [row.nId]
            this.dialog = true
        },
        handleSelectionChangeStar(){
            this.form.nStar = 0
            this.form.lgtSchoolId = this.lgtSchoolId
            this.dialog = true
        },
        handleEnsureClick(){
            this.$refs['ruleForm'].validate((valid) => {
                if(!valid){ 
                    return;
                }
                UpdateSchoolStar(this.form).then(response =>{
                    let res = response.data
                    console.log(res)
                    if(res.code==0){
                        this.dialog = false
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
            })
        },
        handleSizeChange(val) {
            this.queryParams.nPageSize = val
            this.handleQuery()
        },
        handleCurrentChange(val) {
            this.queryParams.nPageIndex = val
            this.handleQuery()
        },
    }

}
</script>
<style lang="less" scoped>
    .container{
        margin: 20px;
        width: 100%;
    }
</style>