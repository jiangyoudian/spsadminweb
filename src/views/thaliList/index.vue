<template>
    <div class="container">
        <el-card class="box-card">
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column prop="nCode" label="套餐编号" align="center"></el-table-column>
                <el-table-column prop="vcValue" label="套餐名" align="center"></el-table-column>
                <el-table-column prop="nValue" label="套餐价格" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="修改" :visible.sync="dialog" :close-on-click-modal="false" width="500px">
            <el-form ref="ruleForm" :model="form">
                <el-form-item label="套餐名称" prop="">
                    <el-input size="small" v-model="form.vcValue" placeholder="请输入套餐名称" style="width: 300px;" clearable/>
                </el-form-item>
                <el-form-item label="套餐价格" prop="">
                    <el-input-number size="small" v-model="form.nValue" :min="0" placeholder="请输入套餐价格" clearable/>
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
import { GetThaliList,UpdateThali } from '@/api';
export default {
    name: 'schoolList',
    data() {
        return {
            tableData: [],
            form: {
                nCode: 0,
                vcValue: '',
                nValue: 0,
            },
            dialog: false,
        }
    },
    mounted(){
        this.handleQuery()
    },
    methods: {
        handleQuery(){
            GetThaliList().then(response =>{
                let res = response.data
                console.log(res)
                if(res.code==0){
                    this.tableData = res.data
                }
            })
        },
        handleUpdate(index,row){
            this.dialog = true;
            this.form.nCode = row.nCode
            this.form.nValue = row.nValue;
            this.form.vcValue = row.vcValue;
        },
        handleEnsureClick(){
            UpdateThali(this.form).then(response =>{
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
        }
    }

}
</script>
<style lang="less" scoped>
    .container{
        margin: 20px;
        width: 100%;
    }
</style>