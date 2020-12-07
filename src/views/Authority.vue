<template>
    <div>
        <el-card>
            <el-table
                :data="authData"
                stripe
                style="width: 100%">
                <el-table-column type="index" width="50" label="#"></el-table-column>
                <el-table-column prop="authName" label="权限名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <!-- 状态 -->
                <el-table-column label="权限等级">
                    <template slot-scope="scoge">
                        <el-tag v-if="scoge.row.level === '0'">一级</el-tag>
                        <el-tag type="success" v-else-if="scoge.row.level === '1'">二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
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
            authData:[]
        }
    },
    created(){
        //获取权限列表数据
        this.getAuthorityList()
    },
    methods:{
        //获取权限列表数据
        async getAuthorityList(){
            let {data:res} = await this.$http.get(`rights/list`);
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
            //获取数据
            this.authData = res.data;
            console.log(res)
        }
    }
}
</script>