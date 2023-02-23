import request from "@/api/root_request";

function endlessReq(data) {
    return request({
        url: '/topic/listaction',
        method: 'get',
        params: data
    })
}

export default endlessReq