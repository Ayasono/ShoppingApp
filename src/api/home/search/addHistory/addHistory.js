import request from "@/api/root_request";

function addHistory(data) {
    return request({
        url: '/search/addhistoryaction',
        method: 'post',
        data: data
    })
}
// post === data get === params
export default  addHistory