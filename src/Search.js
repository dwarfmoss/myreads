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

  updateShelves = (searchedBook, bookShelfBooks) => {
    searchedBook.shelf = "none"
    bookShelfBooks.forEach((shelfBook) => {
      if(searchedBook.id === shelfBook.id) {
        searchedBook = shelfBook
      }
    })
    return searchedBook
  }

  formatSearchResults = (results) => (
    results.map((result) =>
      this.updateShelves(result, this.props.books))
      .sort(sortBy("title"))
  )

  updateSearchResult = (query) => {
    BooksAPI.search(query, 1).then(
      (results) => this.setState({
        searchResults: this.formatSearchResults(results)
      })
    )
    .catch((error) => alert(error))
  }

  handleChange = (event) => {
    this.updateQuery(event.target.value)
    if(event.target.value !== "") {
      this.updateSearchResult(event.target.value)
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
