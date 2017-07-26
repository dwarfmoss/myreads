import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    searchResults: [],
    query: ""
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  updateSearchResults = (results) => {
    var filteredBooks = results.filter((searchBook) => (
      this.props.books.forEach((bookShelfBook) => {
        console.log(bookShelfBook.title)
        console.log(bookShelfBook.id)
        console.log(searchBook.title)
        console.log(searchBook.id)
        if(bookShelfBook.id !== searchBook.id) {
          return true
        } else {
          return false
        }
      })
    ))
    filteredBooks.map((book) => console.log(book.id))
    filteredBooks = filteredBooks.map((book) => (book.shelf = "none"))
    return filteredBooks.concat(this.props.books)
  }

  handleChange = (event) => {
    this.updateQuery(event.target.value)
    BooksAPI.search(event.target.value, 1).then(
      (books) => this.updateSearchResults(books).sort(sortBy("title"))
    ).catch((error) => alert(error))
  }

  render() {
    const { books, changeShelf } = this.props
    const { searchResults, query } = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              value={query}
              onChange={this.handleChange}
              placeholder="Search by title or author"
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  changeShelf={changeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
