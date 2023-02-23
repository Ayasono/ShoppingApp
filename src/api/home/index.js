import request from "@/api/root_request";

function homeData() {
    return request({
        method: 'get',
        url: '/index/index'
    })
}

export default homeData