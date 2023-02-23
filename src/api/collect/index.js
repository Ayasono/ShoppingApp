import request from "@/api/root_request";

function collect(data) {
    return request({
        url: '/collect/addcollect',
        method: 'post',
        data
    })
}

export {
    collect
}