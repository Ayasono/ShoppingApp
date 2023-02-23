import request from "@/api/root_request";

function getCertainAddress(data) {
    return request({
        url: '/address/detailAction',
        method: 'get',
        params: data,
    })
}

export default getCertainAddress