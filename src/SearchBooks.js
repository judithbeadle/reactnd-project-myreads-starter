import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook.js'

class SearchBooks extends Component {


	state = {
		query: '',
		showingBooks: []
	}

	updateQuery = (query) => {
		this.setState({ query: query})
		this.props.onUpdateQuery(query)
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}

	updateBook = (book, shelf) => {
		this.props.onUpdateShelf(book, shelf)
	}

	render(){

		const { query } = this.state
		let { showingBooks } = this.props
		let { message } = this.props

		return(
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
                {showingBooks.map((book) =>(
		    	<li key={book.id}>
					<SingleBook 
						key={book.id}
						book={book}
						onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}
					/>
				</li>
				))}
				<span className="message">{message}</span>
                </ol>
              </div>
      </div>
		)
	}
}

export default SearchBooks