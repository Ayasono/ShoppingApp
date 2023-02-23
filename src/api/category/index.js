import request from "@/api/root_request";

function getIndex(data) {
    return request({
        url: '/category/indexaction',
        method: 'get',
        params: data,
    })
}

function cateNav(data) {
    return request({
        url: '/category/categoryNav',
        method: 'get',
        params: data
    })
}

function goodsList(data) {
    return request({
        url: '/goods/goodsList',
        method: 'get',
        params: data
    })
}

export {
    getIndex,
    cateNav,
    goodsList,
}