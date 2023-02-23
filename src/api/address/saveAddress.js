import request from "@/api/root_request";

function saveAddress(data) {
    return request({
        url: '/address/saveAction',
        method: 'post',
        data
    })
}

export default saveAddress