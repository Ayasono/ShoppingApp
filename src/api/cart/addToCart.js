import request from "@/api/root_request";

function addToCart(data) {
    return request({
        url: '/cart/addCart',
        method: 'post',
        data
    })
}

export default addToCart