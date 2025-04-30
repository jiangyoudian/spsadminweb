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
                        <el-button type="primary" size="small" :loading="loading" icon="Search" @click="handleExport">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="nType" label="类型" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.nType==1?'初中生':scope.row.nType==2?'高中生':'合作者' }}
                    </template>
                </el-table-column>
                <el-table-column prop="vcName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="vcSchool" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="vcPhone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="vcCity" label="城市" align="center"></el-table-column>
                <el-table-column prop="vcCounty" label="区县" align="center"></el-table-column>
                <el-table-column prop="vcSince" label="渠道码" align="center"></el-table-column>
                <el-table-column prop="dtCreateTime" label="创建时间" align="center"></el-table-column>
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
import { QueryProbeSchool,ExportProbeSchool } from '@/api';
export default {
    name: 'exploreList',
    data() {
        return {
            tableData: [],
            queryParams: {
                nPageIndex: 1,
                nPageSize: 10,
                nType: 1,
                vcSchool: '',
                vcName: '',
                dtStartTime: '',
                dtEndTime: '',
                date: [],
            },
            totalRowNum: 0,
            options: [{
                value: 0,
                label: '全部'
            },{
                value: 1,
                label: '初中生'
            }, {
                value: 2,
                label: '高中生'
            }, {
                value: 3,
                label: '合作者'
            }],
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
            QueryProbeSchool(this.queryParams).then(response =>{
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
        handleExport(){
            this.loading = true
            ExportProbeSchool(this.queryParams).then(response =>{
                let res = response
                console.log(res)
                this.loading = false
                if(res.status==200){
                    this.$message({
                        message: '导出成功',
                        type: 'success'
                    });
                    this.downloadfile(res,'探校记录')
                }else{
                    this.$message({
                        message: res.statusText,
                        type: 'error'
                    });
                }   
            })
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
        },
        downloadfile(res,name) {
            var blob = new Blob([res.data], {
                type: 'application/octet-stream;charset=UTF-8'
            })

            // var contentDisposition = res.headers['content-disposition']

            // var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
            // var result = patt.exec(contentDisposition)

            // console.log('contentDisposition',contentDisposition)

            // let nameplit = contentDisposition.split('.')

            var filename = name +'.xlsx' //+ nameplit[nameplit.length -1];
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            var reg = /^["](.*)["]$/g

            downloadElement.style.display = 'none'
            downloadElement.href = href
            downloadElement.download = decodeURI(filename.replace(reg, '$1')) // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素

            window.URL.revokeObjectURL(href)
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