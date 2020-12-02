import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue)=> {
    
    axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';
    // 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer