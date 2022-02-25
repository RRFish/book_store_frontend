import bookStoreResquest from '../utils/request.js'

async function bookQueryApi(data){
  const res = await bookStoreResquest.post("book/query", data)
  return res
}

async function bookInsertApi(data){
  const res = await bookStoreResquest.post("book/insert", data)
  return res
}

async function bookUpdateApi(data){
  const res = await bookStoreResquest.post("book/update", data)
  return res
}

async function bookDeleteApi(id){
  const idList = [id]
  const res = await bookStoreResquest.post("book/delete", {idList})
  return res
}

async function bookQueryClassApi(){
  const res = await bookStoreResquest.post("book/queryClass")
  return res
}



export {
  bookQueryApi,
  bookInsertApi,
  bookUpdateApi,
  bookQueryClassApi,
  bookDeleteApi
}