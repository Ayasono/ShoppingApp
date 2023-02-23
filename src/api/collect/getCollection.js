import request from "@/api/root_request";

function getCollection(data) {
    return request({
        url: '/collect/listAction',
        method: 'get',
        params: {
            openId: data,
        }
    })
}

export default getCollection