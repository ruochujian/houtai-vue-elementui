<template>
    <div>
        <el-card class="box_card">
            <el-row  :gutter="10">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="params.query" clearable @clear="getUsersList" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="12"><el-button type="primary" @click="dialogVisible = true">+添加用户</el-button></el-col>
            </el-row>
            <el-table
                :data="usersData"
                stripe
                style="width: 100%">
                <el-table-column type="index" width="50" label="#"></el-table-column>
                <el-table-column prop="username" label="姓名" width="100"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <!-- 状态 -->
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            @change ="handleStatus(scope.row)"
                            v-model="scope.row.mg_state">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                        @click="handleEdit(scope.row)"></el-button>
                        <el-button size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)" icon="el-icon-delete"></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button size="mini" type="warning" icon="el-icon-setting"
                            @click="handleSet(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="params.pagesize"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
        </el-card>
        <!-- 添加用户弹框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="40%"
            @close="resetForm">
            <!-- 添加表单 -->
            <el-form label-position="left"
             label-width="120px" 
             ref="addUserData" 
             :rules="userRules"
             :model="addFormData">
                <el-form-item label="用户" prop="username">
                    <el-input v-model="addFormData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addFormData.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addFormData.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addFormData.mobile"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserClick">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑用户弹框 -->
        <el-dialog
            title="编辑用户"
            :visible.sync="editUserDiglog"
            width="40%"
            @close="resetForm">
            <!-- 编辑用户 -->
            <el-form label-position="left"
             label-width="120px" 
             ref="addUserData" 
             :rules="userRules"
             :model="editFormData">
                <el-form-item label="用户">
                    <el-input v-model="editFormData.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editFormData.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editFormData.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDiglog = false">取 消</el-button>
                <el-button type="primary" @click="editUserClick">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配角色弹框 -->
        <el-dialog
            title="提示"
            :visible.sync="showRoleDiglog"
            width="30%">
            <!-- 分配角色 -->
            <el-form label-position="left"
             label-width="120px" 
             ref="addUserData" 
             :model="setRoleData">
                <el-form-item label="当前用户">
                    <el-input v-model="setRoleData.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前角色">
                    <el-input v-model="setRoleData.role" disabled></el-input>
                </el-form-item>
                <el-form-item label="分配新角色">
                    <el-select v-model="selRoleId" placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRoleDiglog = false">取 消</el-button>
                <el-button type="primary" @click="saveSelRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            params:{
                query:'',
                pagenum: 1, //当前页数
                pagesize:10, //每页几条
            },
            usersData:[],//用户列表
            total:0,
            //dialog
            dialogVisible: false,
            addFormData:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            userRules: {
                username: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type:'email', message: '邮箱格式错误', trigger: ['blur', 'change'] },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { len:11,tyep:'number', message: '请输入正确的手机号码', trigger: 'blur' },
                ]
            },
            //编辑用户
            editUserDiglog:false,
            editFormData:{},
            //分配用户
            showRoleDiglog:false,
            setRoleData:{},
            userInfo:{},
            roleList:[],//角色列表
            selRoleId:''
        }
    },
    created(){
        this.getUsersList()
    },
    methods:{
        //获取用户列表
        async getUsersList(){
            let {data:res}= await this.$http.get('users',{params:this.params});
            console.log(res)
            if(res.meta.status!==200) return this.$message.error(res.meta.msg);
            //赋值
            this.usersData = res.data.users;
            this.total = res.data.total
        },
        //分页
        //监听 pagesize 改变
        handleSizeChange(val) {
            this.params.pagesize = val;
            this.getUsersList()
        },
        //监听 页码值 改变
        handleCurrentChange(val) {
            this.params.pagenum = val;
            this.getUsersList()
        },
        //状态修改
        async handleStatus(row){
            const {data:res} = await this.$http.put(`users/${row.id}/state/${row.mg_state}`);
            console.log(res)
            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }
            this.$message.success('更新状态成功');
            
        },
        //关闭添加用户弹框
        resetForm(){
            this.$refs.addUserData.resetFields();
        },
        //确定添加用户
        addUserClick(){
            this.$refs.addUserData.validate(async val=>{
                if(!val) return;
                //调用请求
                const {data:res} = await this.$http.post('users',this.addFormData);
                if(res.meta.status !== 201) return this.$message.error('添加失败');
                //添加成功！
                this.$message.success('添加成功');
                //关闭对话框
                this.dialogVisible = false;
                this.getUsersList();
            })
        },
        //编辑用户弹框
        handleEdit(row){
            console.log(row)
            this.editFormData = row
            this.editUserDiglog = true;
        },
        //编辑确定
        editUserClick(){
            const id = this.editFormData.id;
            this.$refs.addUserData.validate(async val=>{
                if(!val) return;
                //调用请求
                const {data:res} = await this.$http.put(`users/${id}`,{
                    email:this.editFormData.email,
                    mobile:this.editFormData.mobile,
                });
                if(res.meta.status !== 200) return this.$message.error('更新用户信息失败');
                //添加成功！
                this.$message.success('更新成功');
                //关闭对话框
                this.editUserDiglog = false;
                this.getUsersList();
            })
            
        },
        //删除确定
        handleDelete(id){
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const {data:res} = await this.$http.delete(`users/${id}`);
                console.log(res)
                if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                //删除
                this.$message.success('删除成功！')
                this.getUsersList();
            })
        },
        //分配角色
        async handleSet(row){
            console.log(row)
            this.showRoleDiglog = true;
            this.setRoleData={
                username: row.username,
                role:row.role_name
            };
            this.userInfo = row;
            //获取角色列表
            let {data:res} = await this.$http.get('roles');
            this.roleList = res.data
        },
        //保存分配角色
        async saveSelRole(){
            if(!this.selRoleId) return this.$message.error('请选择分配角色');
            let {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,{
                rid:this.selRoleId
            });
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.$message.error(res.meta.msg);
        }
    }
}
</script>

<style scoped>
.box_card{
    margin-top:15px;
}
.el-pagination{
   margin-top:15px; 
}
</style>