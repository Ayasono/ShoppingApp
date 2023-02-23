import request from "@/api/root_request";

function getAddressList(data) {
    return request({
        url: "/address/getListAction",
        method: "get",
        params: {
            openId: data
        }
    })
}

export default getAddressList