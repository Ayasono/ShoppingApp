import request from "@/api/root_request";

function helperaction(data) {
    return request({
        url: '/search/helperaction',
        method: 'get',
        params: data,
    })
}

export default helperaction