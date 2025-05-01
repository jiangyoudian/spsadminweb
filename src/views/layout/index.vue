<template>
    <el-container class="main-container">
        <!-- 头部区域 -->
        <el-header>
            <!-- 左侧的 logo -->
            <div style="display: flex;align-items: center;">
                <img class="head-img" src="../../assets/images/my_head.png" alt="" />
                <div class="head-title">问卷调查</div>
            </div>
        </el-header>
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside width="200px">
                <!-- 左侧导航菜单 -->
                <el-menu class="el-menu-vertical-demo" background-color="#009FFF" text-color="#fff"
                    active-text-color="#fff" unique-opened router>
                    <template v-for="item in menus">
                        <!-- 不包含子菜单的“一级菜单” -->
                        <el-menu-item :index="item.indexPath" :key="item.indexPath" v-if="!item.children"><i :class="item.icon"></i>{{ item.title }}</el-menu-item>
                    </template>

                </el-menu>
            </el-aside>
            <el-container>
                <!-- <el-main> -->
                    <router-view></router-view>
                <!-- </el-main> -->
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { getMenusAPI } from '@/api';
export default {
    name: 'my-layout',
    data() {
        return {
            menus: []//侧边栏数据
        }
    },
    methods: {
        logoutFn() {
            if (confirm('您确定要退出吗')) {
                this.$store.commit('UPDATATOKEN', '')
                this.$store.commit('UPDATAUSERINFO', '')
                this.$router.push('/login')
            }
        },
        // ...其他
        // 获取侧边栏菜单数据
        async getMenusListFn() {
            // const { data: res } = await getMenusAPI()

            this.menus = [
                {
                    indexPath: '/content',
                    title: '问卷内容'
                },
                {
                    indexPath: '/schoolList',
                    title: '中职(技工)学校列表'
                },
                {
                    indexPath: '/scoreList',
                    title: '学校分数线列表'
                },
                {
                    indexPath: '/thaliList',
                    title: '高中志愿填报套餐'
                },
                {
                    indexPath: '/reportList',
                    title: '学业规划报告数据'
                },
                {
                    indexPath: '/exploreList',
                    title: '探校数据'
                },
                {
                    indexPath: '/volunteerList',
                    title: '志愿填报数据'
                },
                {
                    indexPath: '/contactList',
                    title: '联系我们数据'
                },
            ] //res.data
        }
    },
    created() {
        this.getMenusListFn()
    },
    computed: {
        // ...mapGetters(['nickname', 'username', 'user_pic'])
    }
}
</script>
<style lang="less" scoped>
.main-container {
    height: 100%;

    .el-header,
    .el-aside {
        background: linear-gradient( 121deg, #009FFF 0%, #0066FF 100%);
    }

    .el-header {
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    .head-img{
        margin: 2px 20px;
        width: 56px;
        height: 56px;
    }

    .head-title{
        margin-left: -8px;
        font-size: 20px;
        color: #FFFFFF;
    }

    .el-main {
        overflow-y: scroll;
        height: 0;
        background-color: #F2F2F2;
    }

    .el-footer {
        background-color: #eee;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
}

// 左侧边栏用户信息区域
.user-box {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    user-select: none;
    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 15px;
        object-fit: cover;
    }
    span {
        color: white;
        font-size: 12px;
    }
}

// 侧边栏菜单的样式
.el-aside {

    .el-submenu,
    .el-menu-item {
        width: 200px;
        user-select: none;
    }
}
</style>