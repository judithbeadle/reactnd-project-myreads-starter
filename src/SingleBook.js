import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SingleBook extends Component {
	render(){

		const { book } = this.props
		

		const style = {
			width: 128,
			height: 192,
			backgroundImage: this.props.book.imageLinks ? `url(${this.props.book.imageLinks.smallThumbnail})` : ''
		}

		return (
			
				<div className="book">
			  		<div className="book-top">
			   			<div className="book-cover" style={style} />
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
			    	<div className="book-title">{this.props.book.title}</div>
			  		<div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', ') : ''}</div>
				</div>
			
		)
	}
}

export default SingleBook
