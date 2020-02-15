let bookCollections = new Map()
if (localStorage.bookCollections) {
  bookCollections = new Map(JSON.parse(localStorage.getItem('bookCollections')))
}
export default {
  bookCollections: bookCollections,
  collected: false
}
