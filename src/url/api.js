import axios from "axios"

let config = {
    headers: { 'Authorization': 'ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWFXUWlPaUpwYm5SbGJHeHRZVzVoWjJWeWRXbGtJaXdpYzNWaUlqb2llMXdpZFhObGNrbGtYQ0k2WENJeE1UTmNJbjBpTENKMWMyVnlYMjVoYldVaU9pSnBiblJsYkd4dFlXNWhaMlZ5ZFhObGNtNWhiV1VpTENKdWFXTnJYMjVoYldVaU9pSllMV2x1ZEdWc2JHMWhibUZuWlhJaUxDSnBjM01pT2lKcGJuUmxiR3h0WVc1aFoyVnlJaXdpWlhod0lqb3hOakF4TkRjME5EWTFMQ0pwWVhRaU9qRTJNREUwTmpjeU5qVXNJbXAwYVNJNklqazROamszWWpObUxXVm1ZVGd0TkdRNE1pMWlZVEptTFRZeU9HTTBOMkV4WWpkbE5TSjkuZ1BfM1drWE1VRUhVakhYTU9VYy1xc215MzVoOUdFNUNlZ0hRSUY5Qk53UQ==' }
}
export const userSos = (params) => { return axios.post("/park/Message/userSos", params) } //小程序sos报警
export const classifyListtow = (params) => { return axios.post("/park/assets/classify/list/select", params) } //查询公园资产归类二级下拉列表
export const classifyListone = (params) => { return axios.post("/park/assets/classify/list/select/one", params) } //查询公园资产归类一级下拉列表
export const selectassets = (params) => { return axios.post("/park/v1.0/app/park/select/assets", params) } //公园内设施列表
export const planassets = (params) => { return axios.post("/park/way/plan/select", params) } //查询导航路线/