import {books} from "../fixtures"

export function getBooks({limit, page, search}) {
  return new Promise(resolve => {
    setTimeout(() => {

      resolve({
        items: books[page],
        has_more: page < (books.length - 1)
      })
    }, 2000)
  })

  return request('/books')
}

export function getBook({id}) {
  return new Promise(resolve => {
    setTimeout(() => {

      resolve(books[0][0])
    }, 0)
  })

  return request('/book/' + id)
}

export function updateBookApi(id, data) {
  console.log("updateBookApi", id, data)
  return new Promise(resolve => {
    setTimeout(() => {

      resolve(books[0][0])
    }, 2000)
  })

  return request('/book/edit/' + id)
}

export function addBookApi(data) {
  console.log("addBookApi", data)
  return new Promise((resolve, reject)   => {
    setTimeout(() => {
      //reject({})
     // resolve({})
      resolve({errors: {
        title: 'неверно заполнено поле название'
        }})
    }, 2000)
  })

  return request('/book/create')
}

function request(url, body) {
  return fetch(url, {method: "POST", body})
    .then(res => res.json())
}
