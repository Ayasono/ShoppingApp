import request from "@/api/root_request";

function getItemDetail(id, openId) {
    return request({
        url: '/goods/detailaction',
        method: 'get',
        params: {
            id,
            openId
        },
    })
}

export default getItemDetail