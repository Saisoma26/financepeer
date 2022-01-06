import {Component} from 'react'
import './index.css'

class Bookcard extends Component {
  render() {
    const {bookdetails} = this.props
    const {title, id, body} = bookdetails
    return (
      <div className="eachbook-container">
        <h1 className="title">{title}</h1>
        <p className="description">{body}</p>
      </div>
    )
  }
}

export default Bookcard
