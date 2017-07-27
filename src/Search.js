import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    searchResults: [],
    query: ""
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  updateSearchResult = (result, bookShelfBooks) => {
    result.shelf = "none"
    bookShelfBooks.forEach((shelfBook) => {
      if(result.id === shelfBook.id) {
        result = shelfBook
      }
    })
    return result
  }

  handleChange = (event) => {
    this.updateQuery(event.target.value)
    if(event.target.value !== "") {
      BooksAPI.search(event.target.value, 1).then(
        (results) => this.setState({
          searchResults: results.map((result) =>
            this.updateSearchResult(result, this.props.books))
            .sort(sortBy("title"))
        })
      )
      .catch((error) => alert(error))
    }
  }

  render() {
    const { changeShelf } = this.props
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
