<template>
    <div class="container">
        <el-card class="box-card">
            <div class="top-box">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                    <el-form-item label="创建时间" prop="">
                        <el-date-picker
                            v-model="queryParams.date"
                            type="daterange"
                            size="small"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="dateChange">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="Search" @click="handleQuery">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column prop="vcId" width="200" label="编号" align="center"></el-table-column>
                <el-table-column prop="vcName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="nSex" label="性别" align="center"  width="50">
                    <template slot-scope="scope">
                        {{ scope.row.nSex==1?'男':scope.row.nType==2?'女':'未知' }}
                    </template>
                </el-table-column>
                <el-table-column prop="nAge" label="年龄" align="center" width="50"></el-table-column>
                <el-table-column prop="vcPhone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="vcCity" label="城市" align="center" width="80" ></el-table-column>
                <el-table-column prop="vcCounty" label="区县" align="center" width="80"></el-table-column>
                <el-table-column prop="vcSchool" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="vcClass" label="所在班级" align="center"></el-table-column>
                <el-table-column prop="vcSince" label="渠道码" align="center"></el-table-column>
                <el-table-column prop="dtCreateTime" label="创建时间" align="center" width="100"></el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
                <el-pagination :current-page="queryParams.nPageIndex" :page-sizes="[10, 20, 50, 100, 400, 1000]"
                :page-size="queryParams.nPageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRowNum"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </el-card>
    </div>
</template>
    
<script>
import { QueryQuestionnaire } from '@/api';
export default {
    name: 'exploreList',
    data() {
        return {
            tableData: [],
            queryParams: {
                nPageIndex: 1,
                nPageSize: 10,
                dtStartTime: '',
                dtEndTime: '',
                date: [],
            },
            totalRowNum: 0,
            loading: false,
        }
    },
    mounted(){
        this.timeDate()
        this.handleQuery()
    },
    methods: {
        handleQuery(){
            if(!this.queryParams.dtStartTime||!this.queryParams.dtEndTime){
                this.$message({
                    message: '请选择创建时间',
                    type: 'warning'
                });
                return
            }
            QueryQuestionnaire(this.queryParams).then(response =>{
                let res = response.data
                console.log(res)
                if(res.code==0){
                    this.tableData = res.data.data
                    this.totalRowNum = res.data.dataCount
                }
            })
        },
        dateChange(e){
            console.log(e)
            if(e&&e.length>0){
                this.queryParams.dtStartTime = e[0]
                this.queryParams.dtEndTime = e[1]
            }else{
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
        timeDate(){
            let date = new Date();
            this.queryParams.dtEndTime = this.timestampToYearMonthDate(date.getTime())
            this.queryParams.dtStartTime = this.timestampToYearMonthDate(date.setTime(date.getTime() - 3600 * 1000 * 24 * 7));
            this.queryParams.date = [this.queryParams.dtStartTime,this.queryParams.dtEndTime]
        },
        timestampToYearMonthDate(timestamp) {
            let date = new Date(timestamp);
            let year = date.getFullYear();
            let month = date.getMonth() + 1; // 月份从0开始，需要加1
            let day = date.getDate();
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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