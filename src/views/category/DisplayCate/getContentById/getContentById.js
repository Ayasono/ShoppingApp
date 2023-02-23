import request from "@/api/root_request";

function getContentById(data) {
    return request({
        url:'/category/currentaction',
        method: 'get',
        params: data
    })
}

export default getContentById