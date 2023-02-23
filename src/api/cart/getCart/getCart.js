import request from "@/api/root_request";

function getCart(openId) {
    return request({
        url: '/cart/cartList',
        method: 'get',
        params: {
            openId
        }
    })
}

export default getCart