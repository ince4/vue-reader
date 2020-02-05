import axios from 'axios'
export default {
  // 根据接口获取书籍信息
  getBooks (gender, type, major, minor, start, limit) {
    return axios.get(`api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
  },
  getBookById (id) {
    return axios.get(`api/book/${id}`)
  },
  // 推荐书籍id
  book_id1: [
    '57d0e45ac4d0b38155635cfc',
    '598128ef60387832032291af',
    '57bafe5b03650d4213a3ae5f',
    '598c1b019b72d5774b20bd48',
    '58d23e7e5d5a3f741bd90f1f',
    '5915952a27c0944f4999f259',
    '598c1ae22d809a7b207b6f99'
  ],
  book_id2: [
    '59159519ac8014f93c13bbe0',
    '5949cddf5e0a840a4b79366a',
    '582c8d9d445e96a21954f9f8'
    // '598c1ae3e1b5df0239a531b7',
    // '598c1ae32d809a7b207b6fad'
  ],
  // 热门书籍id
  getBooksById (f) {
    let bookId = f === 1 ? this.book_id1 : this.book_id2
    return axios.all(bookId.map(item => this.getBookById(item)))
  }
}
