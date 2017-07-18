import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  render() {
    return(
      <div className="shelf">
        <h2 className="shelf-title">{this.props.title}</h2>
        <div className="shelf-books">
          <ol className="books-grid">
            {this.props.booksOnShelf.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
