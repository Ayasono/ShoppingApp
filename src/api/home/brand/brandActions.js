import request from "@/api/root_request";

function getBrandDetails(id) {
    return request({
        url: '/brand/detailaction',
        method: 'GET',
        params: {
            id
        }
    })
}

export default getBrandDetails