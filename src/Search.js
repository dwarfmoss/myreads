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
    this.setState({ query: query.trim() })
  }

  updateSearchResults (query, maxResults) {
    BooksAPI.search(query, maxResults).then(
      (books) => {
        this.setState({ searchResults: books.sort(sortBy("title")) })
      }
    )
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
              onChange={this.updateSearchResults(query, 10)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
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

export default Search
