import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  
  state = {
    books: [],
    query: '',
    showingBooks: [],
    message: ''
  }

  updateShelf = (book, shelf) => {
    let books;
    if (this.state.books.findIndex(b => b.id === book.id) > 0) {
      books = this.state.books.map(b => {
        if (b.id === book.id) {
          return {...book, shelf}
        } else {
          return b
        }
      })
    } else {
      books = [...this.state.books, {...book, shelf}]
    }
    this.setState({books})

    BooksAPI.update(book, shelf).then((data) => {

    })
  }

  // get all books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    let showingBooks
    this.setState({ query: query })
    console.log(query)
    
    if(query){
      BooksAPI.search(query).then(response => {
        if (response.length) {
          showingBooks = response.map(book => {
            const index = this.state.books.findIndex(c => c.id === book.id)
            if( index >= 0 ){
              return this.state.books[index]
            } else {
              return book
            }
          })
          console.log('got books')
        } else {
          console.log('no books')
          showingBooks = []
        }
        this.setState({showingBooks})
      })
    }
    else {
      this.setState({showingBooks})
    }
  }


  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            // TODO function for switching shelf
            // onChangeShelf={this.changeShelf} 
            books={this.state.books}
            onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            showingBooks={this.state.showingBooks}
            onUpdateQuery={(query) => this.updateQuery(query)}
            onUpdateShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
              history.push('/')
              }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
