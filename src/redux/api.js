export const ERRORS = {
  NotFoundError: new Error("not found"),
  UnknownError: new Error("unknown error"),
}

function getBooks({page = 1, search = '', orderBy = '', orderDirection = ''}) {
  let data = {page, search}
  if (orderBy) {
    data["order_by"] = orderBy
    data["order_direction"] = orderDirection
  }
  console.log("getBooks", data)
  return requestGet('/book', data)
}

function getBook({id}) {
  return requestGet('/book/' + id)
}

function getImage(url) {
  return fetch(url, {
    method: "GET",
    withCredentials: true
  })
    .then(res => res.blob())
}

function updateBook(id, {author, description, title, year = "", image = ""}) {
  return requestPost(`/book/${id}/update`, {
    author,
    description,
    title,
    year,
    image
  })
}

function deleteBook(id) {
  return requestPost(`/book/${id}/delete`)
}

function addBook({author, description, title, year = "", image = ""}) {
  return requestPost('/book/create', {
    author,
    description,
    title,
    year,
    image
  })
}

function request(url, method, params = {}) {
  let { body, headers = {} } = params;

  headers["accept"] = "application/json"

  return fetch(url, {
    body,
    headers,
    method,
    withCredentials: true
  })
}

async function handleResponse(res) {
  switch (res.status) {
    case 422:
    case 200:
      let text = await res.text()

      try {
        return JSON.parse(text)
      } catch (e) {
        return text;
      }

    case 404:
      throw ERRORS.NotFoundError
    default:
      throw ERRORS.UnknownError
  }
}

function buildUrl(url, queryParams) {
  url = new URL(process.env.REACT_APP_API_URL + url)
  if (queryParams) {
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]))
  }

  return url;
}

function requestGet(url, queryParams = {}) {
  url = buildUrl(url, queryParams)

  return request(url, "GET").then(handleResponse)
}

function requestPost(url, body, queryParams = {}) {
  url = buildUrl(url, queryParams)

  return request(url, "POST", {
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(body)
  }).then(handleResponse)
}

export default {
  addBook,
  deleteBook,
  updateBook,
  getBook,
  getImage,
  getBooks
}
