import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, changeShelf, updateSearchBook } = this.props

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks ?
              book.imageLinks.smallThumbnail :
              `http://books.google.com/googlebooks/images/no_cover_thumb.gif`
            })`
          }}></div>
          <BookShelfChanger
            book={book}
            changeShelf={changeShelf}
            updateSearchBook={updateSearchBook}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors &&
          book.authors.map((author, index) =>
            <div key={author.replace(" ", "")}>
              {author}
            </div>
          )
        }</div>
      </div>
    )
  }
}

export default Book
