import React from 'react';
import { bookQueryApi, bookInsertApi, bookUpdateApi, bookQueryClassApi, bookDeleteApi } from "../apis/book.js"

class BookSearchBar extends React.Component {

  constructor(props){
    super(props)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onSearchClick(){
    this.props.onSearchClick()
  }

  onInputChange(e){
    if(e.target.value === "請選擇類別"){
      this.props.onInputChange(e.target.id, undefined)
    }else{
      this.props.onInputChange(e.target.id, e.target.value)
    }
  }

  getBookclassJsx(bookclassId){
    let optionsJsx = []
    const defaultJsx = <option id="default" key={0}>請選擇類別</option>
    optionsJsx.push(defaultJsx)

    this.props.bookClassList.forEach((item)=>{
      const newJsx = <option key={item.id} value={item.id}>{item.name}</option>
      optionsJsx.push(newJsx)
    })

    return <select id="bookclassId" value={bookclassId} onChange={this.onInputChange} name="類別">
      {optionsJsx}
    </select>
  }

  render(){
    const {bookname, bookclassId, author, publishingHouse, createDateStart, createDateEnd} = this.props.form
        
    return <div className='searchbar'>
      書名:<input id="bookname" value={bookname} onChange={this.onInputChange}></input>
      類別:{this.getBookclassJsx(bookclassId)}
      作者:<input id="author" value={author} onChange={this.onInputChange}></input>
      出版社:<input id="publishingHouse" value={publishingHouse} onChange={this.onInputChange}></input>
      起始創建日期:<input id="createDateStart" value={createDateStart} onChange={this.onInputChange}></input>
      結束創建日期:<input id="createDateEnd" value={createDateEnd} onChange={this.onInputChange}></input>
      <button onClick={this.onSearchClick}>搜尋</button>
    </div>
  }
}

class BookAdd extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      addForm: {
        "bookname": "",
        "bookclassId": undefined,
        "author": "",
        "publishingHouse": ""
      }  
    }

    this.onBackClick = this.onBackClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.bookInsertHandle = this.bookInsertHandle.bind(this)
    
  }

  onInputChange(e){
    const formField = e.target.id
    const value = e.target.value
    const addForm = this.state.addForm
    if(Object.keys(addForm).includes(formField)){
      addForm[formField] = value
      this.setState({
        addForm
      })
    }
    
  }

  onBackClick(){
    this.props.onBack(false)
  }

  getBookclassJsx(){
    let optionsJsx = []
    const defaultJsx = <option id="default" key={0}>請選擇類別</option>
    optionsJsx.push(defaultJsx)

    this.props.bookClassList.forEach((item)=>{
      const newJsx = <option key={item.id} value={item.id}>{item.name}</option>
      optionsJsx.push(newJsx)
    })

    const addForm = this.state.addForm

    return <select id="bookclassId" value={addForm.bookclassId} onChange={this.onInputChange} name="類別">
      {optionsJsx}
    </select>
  }

  bookInsertHandle(){
    const addForm = this.state.addForm
    bookInsertApi(addForm ).then(()=>{
      this.props.onSearchClick()
    })
  }

  render(){
    const addForm = this.state.addForm
    return (<tr>
    <td><input id="bookname" onChange={this.onInputChange} value={addForm.bookname}></input></td>
    <td>{this.getBookclassJsx()}</td>
    <td><input id="author" onChange={this.onInputChange} value={addForm.author}></input></td>
    <td><input id="publishingHouse" onChange={this.onInputChange} value={addForm.publishingHouse}></input></td>
    <td></td>
    <td>
      <button onClick={this.bookInsertHandle}>提交</button> 
      <button onClick={this.onBackClick}>返回</button> 
    </td>
  </tr>)
  }
}

class BookFix extends React.Component {

  constructor(props){
    super(props)
    const fixForm = {...this.props.originData}
    this.state = {
      fixForm 
    }

    this.onBackClick = this.onBackClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.bookUpdateHandle = this.bookUpdateHandle.bind(this)
    
  }

  onInputChange(e){
    const formField = e.target.id
    const value = e.target.value
    const fixForm = this.state.fixForm
    if(Object.keys(fixForm).includes(formField)){
      fixForm[formField] = value
      this.setState({
        fixForm
      })
    }
    
  }

  onBackClick(){
    this.props.onBack(false)
  }

  getBookclassJsx(){
    let optionsJsx = []
    const defaultJsx = <option id="default" key={0}>請選擇類別</option>
    optionsJsx.push(defaultJsx)

    this.props.bookClassList.forEach((item)=>{
      const newJsx = <option key={item.id} value={item.id}>{item.name}</option>
      optionsJsx.push(newJsx)
    })

    const fixForm = this.state.fixForm

    return <select 
              id="bookclassId" 
              value={fixForm.bookclassId} 
              onChange={this.onInputChange} 
              name="類別">
              {optionsJsx}
            </select>
  }

  bookUpdateHandle(){
    const fixForm = this.state.fixForm
    bookUpdateApi(fixForm).then(()=>{
      this.props.onSearchClick()
      this.onBackClick()
    })
  }

  render(){
    const { bookname, bookclassId, author, publishingHouse, createDate } = this.state.fixForm
    
    return (<tr>
    <td><input id="bookname" onChange={this.onInputChange} value={ bookname }></input></td>
    <td>{ this.getBookclassJsx(bookclassId) }</td>
    <td><input id="author" onChange={this.onInputChange} value={ author }></input></td>
    <td><input id="publishingHouse" onChange={this.onInputChange} value={ publishingHouse }></input></td>
    <td><input id="createDate" onChange={this.onInputChange} value={ createDate }></input></td>
    <td>
      <button onClick={this.bookUpdateHandle}>提交</button> 
      <button onClick={this.onBackClick}>返回</button> 
    </td>
  </tr>)
  }
}

class BookList extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      isAdd: false,
      bookListEditStatusMap: new Map()
    }

    this.setIsAdd = this.setIsAdd.bind(this)
  }

  getBookClassName(bookclassId){
    const bookClassList = this.props.bookClassList
    for(let item of bookClassList){
      if(bookclassId === item.id)
        return item.name
    }
    return "error"
  }

  checkIsEdit(bookId){
    const bookListEditStatusMap = this.state.bookListEditStatusMap
    const value = bookListEditStatusMap.get(bookId)

    if(value) return true
    return false
  }

  onEditClick(id, value){
    const bookListEditStatusMap = new Map(this.state.bookListEditStatusMap)
    bookListEditStatusMap.set(id, value)

    this.setState({
      bookListEditStatusMap
    })
  }

  bookDeteleHandle(id){
    bookDeleteApi(id).then(() => {
      this.props.onSearchClick()
    })
  }

  getBookListJsx(){
    let renderList = []
    const bookList = this.props.bookList
    

    bookList.forEach((item, index)=>{
      const isEdit = this.checkIsEdit(item.id)

      const bookClassList = this.props.bookClassList
      const onSearchClick = this.props.onSearchClick

      if(isEdit){
        renderList.push(<BookFix 
                          key={index}
                          onBack={()=>this.onEditClick(item.id, false)}
                          bookClassList={bookClassList}
                          onSearchClick={onSearchClick}
                          originData={item}/>)
      }else{
        renderList.push(
          <tr key={index}>
            <td>{item.bookname}</td>
            <td>{this.getBookClassName(item.bookclassId)}</td>
            <td>{item.author}</td>
            <td>{item.publishingHouse}</td>
            <td>{item.createDate}</td>
            <td>
              <button onClick={()=>this.onEditClick(item.id, true)}>修改</button> 
              <button onClick={()=>this.bookDeteleHandle(item.id)}>刪除</button> 
            </td>
          </tr>)
      }

    })
  
    return renderList
  }

  getAddJsx(){
    const isAdd = this.state.isAdd
    const bookClassList = this.props.bookClassList
    const onSearchClick = this.props.onSearchClick
    if(isAdd){
      return <BookAdd
              onBack={this.setIsAdd}
              bookClassList={bookClassList}
              onSearchClick={onSearchClick}/>
    }else{
      return null
    }
  }

  setIsAdd(value){
    this.setState({
      isAdd: value
    })
  }

  render(){
    return <div className="book-table">
      <table >
        <thead>
          <tr>
            <th>書名</th>
            <th>書類</th>
            <th>作者</th>
            <th>出版社</th>
            <th>創建時間</th>
            <th>操作</th>
            <th>
              <button onClick={()=>{this.setIsAdd(true)}}>新增</button> 
            </th>
          </tr>
        </thead>
        <tbody>
          {this.getAddJsx()}
          {this.getBookListJsx()}
        </tbody>        
      </table>


    </div>
  }
}

class Book extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bookQueryForm:{
        bookname: "",
        bookclassId: undefined,
        author: "",
        publishingHouse: "",
        createDateStart: "",
        createDateEnd: "",
      },
      bookList: [],
      bookClassList:[]
    }
    this.bookQueryHandle()
    this.bookQueryClassHandle()
    this.bookQueryHandle = this.bookQueryHandle.bind(this)
    this.onInputChange = this.onInputChange.bind(this)    
  }

  bookQueryHandle(){
    bookQueryApi(this.state.bookQueryForm).then((res)=>{
      this.setState({
        bookList: res.data.data
      })
    })
  }

  bookQueryClassHandle(){
    bookQueryClassApi().then((res)=>{
      this.setState({
        bookClassList: res.data.data
      })
    })
  }



  onInputChange(formField, value){
    const form = {...this.state.bookQueryForm}
    if(Object.keys(form).includes(formField)){
      form[formField] = value
      this.setState({
        bookQueryForm: form
      })
    }
  }




  render(){
    return <div>
      <BookSearchBar 
        form={this.state.bookQueryForm}
        bookClassList={this.state.bookClassList}
        onSearchClick={this.bookQueryHandle}
        onInputChange={this.onInputChange}/>
      <BookList 
        bookList={this.state.bookList}
        bookClassList={this.state.bookClassList}
        onSearchClick={this.bookQueryHandle}/>
    </div>
  }
}

export {
  Book
}