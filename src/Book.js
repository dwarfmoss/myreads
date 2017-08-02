import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

function Book(props) {
  const { book, changeShelf, updateSearchBook } = props

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

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default Book
