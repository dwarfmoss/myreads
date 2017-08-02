import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

function Bookshelf(props) {
  const { books, changeShelf } = props

  return(
    <div className="bookshelf">
      <div className="bookshelf-title">
        <h1>MyReads</h1>
      </div>
      <div className="bookshelf-content">
        <Shelf
          title="Currently Reading"
          booksOnShelf={books.filter((book) => book.shelf === "currentlyReading").sort(sortBy("title"))}
          changeShelf={changeShelf} />
        <Shelf
          title="Want to Read"
          booksOnShelf={books.filter((book) => book.shelf === "wantToRead").sort(sortBy("title"))}
          changeShelf={changeShelf} />
        <Shelf
          title="Read"
          booksOnShelf={books.filter((book) => book.shelf === "read").sort(sortBy("title"))}
          changeShelf={changeShelf} />
      </div>
      <div className="open-search">
        <Link className="open-search" to="/search">Add a book</Link>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default Bookshelf
