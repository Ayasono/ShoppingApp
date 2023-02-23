import request from "@/api/root_request";

function typeOrTrend(data) {
    return request({
        url: '/goods/goodsList',
        method: 'get',
        params: data
    })
}

export default typeOrTrend