import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Bookcard from '../Bookcard'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Books extends Component {
  state = {apistatus: apiStatusList.initial, booksList: []}

  componentDidMount() {
    this.getbooksList()
  }

  getbooksList = async () => {
    this.setState({apistatus: apiStatusList.loading})
    const url = 'https://financepeer-app.herokuapp.com/books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        title: book.title,
        id: book.id,
        body: book.body,
      }))
      this.setState({
        booksList: updatedData,
        apistatus: apiStatusList.success,
      })
    } else {
      this.setState({apistatus: apiStatusList.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderbooksList = () => {
    const {booksList} = this.state
    if (booksList.length !== 0) {
      return (
        <ul className="bookslist">
          {booksList.map(each => (
            <Bookcard bookdetails={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return <h1 className="no-books-heading">Not yet Uploaded any file !</h1>
  }

  renderFailureview = () => (
    <div className="failureContainer">
      <h1 className="failureheading">Request Failed</h1>
    </div>
  )

  renderfetchStatus = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusList.failure:
        return this.renderFailureview()
      case apiStatusList.success:
        return this.renderbooksList()
      case apiStatusList.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="booksimage-container">
        <img src="" alt="books-pic" className="booksimage" />
        {this.renderfetchStatus()}
      </div>
    )
  }
}

export default Books
