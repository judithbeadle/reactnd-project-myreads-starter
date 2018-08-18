import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
	// the following is making use of prop-types package. 
	// in Terminal type: npm install --save prop-types
	static propTypes = {
		books: PropTypes.array.isRequired
	}

	state = {
		query: ''
	}

	render(){

		const { books } = this.props
		const { query } = this.state

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
					    	{allBooks.map((book) =>(
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
			</div>
			
			</div>
		)
	}
}


export default ListBooks
