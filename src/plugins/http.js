import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue)=> {
    
    axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';
    //拦截器
    axios.interceptors.request.use(config => {
            //拦截响应，做统一处理 
            config.headers.Authorization = window.sessionStorage.getItem('token')
            return config
    })
    // 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer