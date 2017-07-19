import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
    this.state = { books: [] }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf (book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelf
            books={ this.state.books }
            changeShelf={this.changeShelf} />
        )} />
        <Route path="/search" render={() => (
          <Search changeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
