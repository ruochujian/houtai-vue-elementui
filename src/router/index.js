//模块：配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        redirect: '/login'
    },
    { 
        path: '/login', 
        name: 'login',
        component: () => import('../views/login/login.vue')
    },{ 
        path: '/Home', 
        component: () => import('../views/Home.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
    //to 将要访问的路径
    //from 代表从哪个路径跳转而来
    //next 是一个函数，代表放行
    //next() 放行， next('/login')强制跳转
    if(to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr){
        return next('/login')
    }else{
        return next()
    }
})
  
export default router