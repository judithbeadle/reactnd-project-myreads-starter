import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            // TODO function for switching shelf
            // onChangeShelf={this.changeShelf} 
            books={this.state.books}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            // this.state.showSearchPage
            // books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
