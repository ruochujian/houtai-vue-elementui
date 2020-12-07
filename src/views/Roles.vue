<template>
    <div>
        <el-card class="box_card">
            <div>
                <el-button type="primary">+ 添加角色</el-button>
            </div>
            <el-table
                :data="rolesData"
                stripe
                style="width: 100%;margin-top:15px">
                <!-- 展开列 -->
                <el-table-column type="expand" width="50">
                    <template slot-scope="scope">
                        <div class="level_box" v-for="item in scope.row.children" :key="item.id">
                            <div class="one_level"><el-tag>{{item.authName}}</el-tag></div>
                            <div class="one_right">
                                <div class="level_box2" v-for="item2 in item.children" :key="item2.id">
                                    <div class="two_level"><el-tag type="success">{{item2.authName}}</el-tag></div>
                                    <div class="thress_level">
                                        <el-tag v-for="item3 in item2.children" :key="item3.id" 
                                        type="warning">{{item3.authName}}</el-tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50" label="#"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <!-- 状态 -->
                <el-table-column label="操作">
                    <template>
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //角色列表数据
            rolesData:[]
        }
    },
    created(){
        //获取角色列表数据
        this.getRolesData()
    },
    methods:{
        async getRolesData(){
            let {data:res} = await this.$http.get('roles');
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
            //获取数据
            this.rolesData = res.data;
            console.log(res)
        }
    }
}
</script>

<style lang="less" scoped>
.level_box{
    display: flex;
    border-top: 1px solid #ebeef5;
    .el-tag{
        margin:10px;
    }
}
.one_level{
    flex:1;
}
.one_right{
    flex:3;
}
.level_box2{
    display: flex;
}
.level_box2:not(:last-child){
    border-bottom:1px solid #ebeef5; 
}
.two_level{
    flex:1;
}
.thress_level{
    flex:3;
}
</style>
