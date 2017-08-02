import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
    updateSearchBook: PropTypes.func
  }

  handleChange = (event) => {
    this.props.changeShelf(this.props.book, event.target.value)
    if(this.props.updateSearchBook)
      this.props.updateSearchBook(this.props.book, event.target.value)
  }

  render() {
    const { book } = this.props

    return(
      <div className="book-shelf-changer">
        <select
          value={book.shelf}
          onChange={this.handleChange}
        >
          <option value="na" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
