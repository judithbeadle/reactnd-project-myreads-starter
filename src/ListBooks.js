import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook.js'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
	// the following is making use of prop-types package. 
	// in Terminal type: npm install --save prop-types
	updateBook = (book, shelf) => {
		this.props.onUpdateShelf(book, shelf)
	}

	render(){

		const { books } = this.props
		

		let allBooks
		allBooks = books

		allBooks.sort(sortBy('name'))

		return (
			<div className="list-books">
				<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
            	<div className="list-books-content">
					<div className="bookshelf">
						<h2 className="bookshelf-title">Currently Reading</h2>
						<div className="bookshelf-books">
					    <ol className="books-grid">
					    	{allBooks.filter(book => book.shelf === 'currentlyReading').map((book) =>(
					    	<li key={book.id}>
							<SingleBook 
            					book={book}
							/>
							</li>
						))}
					    </ol>
					</div>
					
					<div className="bookshelf">
					<h2 className="bookshelf-title">Want to Read</h2>
						<div className="bookshelf-books">
						    <ol className="books-grid">
						    	{allBooks.filter(book => book.shelf === 'wantToRead').map((book) =>(
						    	<li key={book.id}>
								<SingleBook 
	            					book={book}
								/>
								</li>
							))}
						    </ol>
						</div>
					</div>

					<div className="bookshelf">
					<h2 className="bookshelf-title">Read</h2>
						<div className="bookshelf-books">
						    <ol className="books-grid">
						    	{allBooks.filter(book => book.shelf === 'read').map((book) =>(
						    	<li key={book.id}>
								<SingleBook 
	            					book={book}
								/>
								</li>
							))}
						    </ol>
						</div>
					</div>

	            </div>
			</div>
			<div className="open-search">
			 	<Link className="close-search" to="/search">Add a book</Link>
            </div>
			</div>
		)
	}
}


export default ListBooks
