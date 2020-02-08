import axios from 'axios'
export default {
  // 根据接口获取书籍信息
  getBooks (gender, type, major, minor, start, limit) {
    return axios.get(`api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
  },
  getBookById (id) {
    return axios.get(`/api/book/${id}`)
  },
  getRankingId () {
    return axios.get(`api/ranking/gender`)
  },
  getRankingBooks (id) {
    return axios.get(`api/ranking/${id}`)
  }
}
