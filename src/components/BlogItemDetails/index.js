import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItemDetails extends Component {
  state = {blogDetails: {}, isLoading: true}

  componentDidMount = () => {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(this.props)
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()

    const formattedData = {
      id: data.id,
      author: data.author,
      avatarUrl: data.avatar_url,
      imageUrl: data.image_url,
      title: data.title,
      topic: data.topic,
      content: data.content,
    }
    // console.log(formattedData)

    this.setState({blogDetails: formattedData, isLoading: false})
  }

  render() {
    const {blogDetails, isLoading} = this.state

    const {title, imageUrl, content, avatarUrl, author} = blogDetails
    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00bfff" height={50} width="50" />
        ) : (
          <div className="blog-info">
            <h2 className="blog-details-title">{title}</h2>
            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>
            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}

export default BlogItemDetails
