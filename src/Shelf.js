import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function Shelf(props) {
  const { booksOnShelf, title, changeShelf } = props

  return(
    <div className="shelf">
      <h2 className="shelf-title">{title}</h2>
      <div className="shelf-books">
        <ol className="books-grid">
          {booksOnShelf.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                changeShelf={changeShelf}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

Shelf.propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default Shelf
