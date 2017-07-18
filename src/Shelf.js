import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { booksOnShelf, title, changeShelf } = this.props
    
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
}

export default Shelf
