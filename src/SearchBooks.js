import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired
	}

	state = {
		query: ''
	}

	render(){
		const { query } = this.state
		const { books } = this.props

		//allBooks.sort(sortBy('name'))

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

					    	{books.map((book) =>(
							<li key={book.id}>
								<div className="book">
					          		<div className="book-top">
					           			<div className="book-cover" style={{
										width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
										}} />
										<div className="book-shelf-changer">
					                      <select>
					                        <option value="move" disabled>Move to...</option>
					                        <option value="currentlyReading">Currently Reading</option>
					                        <option value="wantToRead">Want to Read</option>
					                        <option value="read">Read</option>
					                        <option value="none">None</option>
					                      </select>
					                    </div>
					                </div>
					            	<div className="book-title">{book.title}</div>
					          		<div className="book-authors">{book.authors.join(", ")}</div>
					        	</div>
							</li>
						))}
					    </ol>
	            </div>
			</div>
		)
	}
}

export default SearchBooks