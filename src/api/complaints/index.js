import request from "@/api/root_request";

function sendComplaints(data) {
    return request({
        url: '/feedback/submitAction',
        method: 'POST',
        data
    })
}

export default sendComplaints