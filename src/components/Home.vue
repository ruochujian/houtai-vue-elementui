<template>
    <el-container class="home_container">
        <!-- 顶部 -->
        <el-header height="50px">
            <div class="header_logo">
                <img src="../assets/logo.png" width="30">
                <span>电商后台管理系统</span>
            </div>
            <div class="logout" @click="handleLogout">退出</div>
        </el-header>
        <el-container>
            <!-- 侧边导航菜单 -->
            <el-aside :width="isCollapse?'64px':'180px'">
                <div class="menu_auto" @click="isCollapse=!isCollapse"> |||</div>
                <el-menu
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#2c3e50"
                    text-color="#fff"
                    active-text-color="#2196f3"
                    :default-active="activePath"
                    unique-opened
                    :collapse-transition="false"
                    :collapse="isCollapse"
                    router>
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item v-for="item2 in item.children" :key="item2.id" 
                        :index="'/'+item2.path">{{item2.authName}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 内容 -->
            <el-main :style="isCollapse?'margin-left:64px':'margin-left:180px'">
                <el-breadcrumb separator="/" style="margin-bottom:20px">
                    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            //是否折叠
            isCollapse:false,
            //左侧菜单数据
            menuList:[],
            icons:{
                '125':'el-icon-user-solid',
                '103':'el-icon-s-tools',
                '101':'el-icon-s-goods',
                '102':'el-icon-s-order',
                '145':'el-icon-s-marketing',
            },
            activePath:''
        }
    },
    created(){
        //获取左侧菜单
        this.getMenuList();
        //获取当前路径
        this.activePath = this.$route.path;
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //获取左侧菜单
      async getMenuList(){
        const {data:res} = await this.$http.get('menus');
        console.log(res)
        if(res.meta.status === 200){
            this.menuList = res.data
        }else{
            this.$message.error(res.meta.msg)
        }
      },
      //退出登录
      handleLogout(){
          window.sessionStorage.clear('token');
          this.$router.push('/login')
      }
    }
}
</script>

<style lang="less" scoped>
.home_container{
    height: 100%;
}
.el-header {
    background-color: #2c3e50;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index: 9;
    .header_logo{
        display: flex;
        align-items: center;
        span{
            font-size: 20px;
            margin-left: 10px;
        }
    }
    .logout{
        font-size: 14px;
        padding: 4px 8px;
        border-radius: 3px;
        border:1px solid rgba(255,255,255,.2);
        cursor: pointer;
    }
  }
  
  .el-aside {
    background-color: #2c3e50;
    color: #fff;
    overflow-x: hidden;
    position: fixed;
    top:50px;
    left: 0;
    bottom: 0;
    z-index: 9;
    .menu_auto{
        text-align: center;
        font-weight: bold;
        background: #40556b;
        color: #abb5bf;
        font-size: 12px;
        height: 36px;
        line-height: 32px;
        cursor: pointer;
        letter-spacing: 1px;
    }
    .el-menu{
        border-right: 0;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    margin-top: 50px;
  }

</style>