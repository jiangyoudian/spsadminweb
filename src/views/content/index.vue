<template>
    <div class="container">
        <el-tabs v-model="nType" @tab-click="handleNodeClick" style="background-color: white; padding: 0 5px;">
            <el-tab-pane label="中考科目" name="10000"></el-tab-pane>
            <el-tab-pane label="高考科目" name="20000"></el-tab-pane>
            <el-tab-pane label="兴趣爱好" name="30000"></el-tab-pane>
            <el-tab-pane label="性格特点" name="40000"></el-tab-pane>
            <el-tab-pane label="家长可承受费用(初中)" name="51000"></el-tab-pane>
            <el-tab-pane label="家长可承受费用(高中)" name="55000"></el-tab-pane>
            <el-tab-pane label="家庭期望目标(初中)" name="52000"></el-tab-pane>
            <el-tab-pane label="家庭期望目标(高中)" name="56000"></el-tab-pane>
            <el-tab-pane label="学业方向意愿" name="53000"></el-tab-pane>
            <el-tab-pane label="家庭年收入" name="54000"></el-tab-pane>
            <el-tab-pane label="技能培养目标" name="60000"></el-tab-pane>
            <el-tab-pane label="意向专业" name="70000"></el-tab-pane>
            <el-tab-pane label="就读距离" name="57000"></el-tab-pane>
            <el-tab-pane label="读研读博" name="58000"></el-tab-pane>
        </el-tabs>
        <el-card class="box-card">
            <el-button
                size="small"
                type="primary"
                @click="handleAdd()">新增</el-button>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    type="index"
                    width="50"
                    label="编号"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="vcValue"
                    label="内容"
                    align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="small"
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog :title="title" :visible.sync="dialog" :close-on-click-modal="false" width="500px">
            <el-form ref="ruleForm" :model="form" :rules="rulesObj">
                <el-form-item prop="vcValue">
                    <el-input type="textarea" v-model="form.vcValue" style="width:450px;" :rows="8" size="small" placeholder="请输入内容" />
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
import { GetQuestion,AddOrUpdateQuestion,DeletQuestion } from '@/api';
export default {
    name: 'content',
    data() {
        return {
            nType: '10000',
            tableData: [],
            form: {
                nCode: '',
                nType: '',
                vcValue: '',
            },
            title: '新增',
            dialog: false,
            rulesObj: {
                vcValue: [
                    { required: true, message: '内容不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        this.getList(this.nType)
    },
    methods: {
        getList(nType){
            GetQuestion(nType).then(response =>{
                console.log(response)
                let res = response.data
                if(res.code==0){
                    this.tableData = res.data
                }
            })
        },
        handleNodeClick(tab,data) {
            this.getList(tab.name)
        },
        handleAdd(){
            this.form.nCode = 0
            this.form.vcValue = ''
            this.title = '新增'
            this.dialog = true
        },
        handleEdit(index,row){
            this.form = {...row}
            this.title = '编辑'
            this.dialog = true
        },
        handleDelete(index,row){
            let that = this
            this.$confirm('确定删除此数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DeletQuestion(row.nCode).then(response =>{
                    let res = response.data
                    console.log(res)
                    if(res.code==0){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        that.getList(that.nType)
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
        handleEnsureClick(){
            let that = this
            this.$refs['ruleForm'].validate((valid) => {
                if(!valid){ 
                    return;
                }
                this.form.nType = this.nType
                AddOrUpdateQuestion(this.form).then(response =>{
                    let res = response.data
                    console.log(res)
                    if(res.code==0){
                        this.dialog = false
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        that.getList(that.nType)
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }   
                })
            })
        },
    }

}
</script>
<style lang="less" scoped>
    .container{
        margin: 20px;
        width:100%
    }
</style>