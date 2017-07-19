import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  constructor(props) {
    super(props)

    this.updateQuery = this.updateQuery.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      searchResults: [],
      query: ""
    }
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  handleChange(event) {
    this.updateQuery(event.target.value)
    if(event.target.value !== "") {
      BooksAPI.search(event.target.value, 20).then(
        (books) => {
          if(books.length > 0) {
            this.setState({ searchResults: books.sort(sortBy("title")) })
          } else {
            this.setState({ searchResults: [] })
          }

        }
      )
    } else {
      this.setState({ searchResults: [] })
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
