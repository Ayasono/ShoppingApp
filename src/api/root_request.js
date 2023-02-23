import Vue from 'vue'
import axios from 'axios'
import {Toast} from "vant";

Vue.use(Toast)

let host
if (process.env.NODE_ENV === "development") {
    //开发环境
    host = "http://shop.bufantec.com/bufan"
} else {
    host = "http://shop.bufantec.com/bufan"
}

let request = axios.create({
    // host address
    baseURL: host,
    timeout: 5 * 1000
})

// axios interceptors
let loading
request.interceptors.request.use(config => {
    // loading animation
    loading = Toast.loading({
        message: 'Loading...',
        forbidClick: true,
        // duration: 0,
    })
    console.log(config)
    return config
}, err => {
    return Promise.reject(err)
})

request.interceptors.response.use(response => {
    loading.clear()
    return response.data
}, err => {
    loading.clear()
    return Promise.reject(err)
})

export default request
