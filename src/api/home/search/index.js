import request from "@/api/root_request"

function searchHistoryAndTrend(data) {
    return request({
        url: '/search/indexaction',
        method: 'get',
        params: data
    })
}

export {
    searchHistoryAndTrend
}