import request from "@/api/root_request";

function deleteCartItem(data) {
    return request({
        url: "/cart/deleteAction",
        method: 'get',
        params: {
            id: data
        }
    })
}

export default deleteCartItem