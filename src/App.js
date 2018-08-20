import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'
import SingleBook from './SingleBook.js'

class BooksApp extends Component {
  
  state = {
    books: [],
    query: '',
    showingBooks: []
  }

  // get all books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    let showingBooks = []
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
        }
        this.setState({showingBooks})
      })
    }
    else {
      this.setState({showingBooks})
    }
  }

  render() {
    const {query} = this.state
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            // TODO function for switching shelf
            // onChangeShelf={this.changeShelf} 
            books={this.state.books}
            onUpdateShelf={(book, shelf) => this.UpdateShelf(book, shelf)}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <div className="search-books">
              <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                  />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.showingBooks.map((book,i) => (
                   <li key={book.id}>
              <SingleBook 
                      book={book}
              />
              </li>
                      ))}
                </ol>
              </div>
      </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
