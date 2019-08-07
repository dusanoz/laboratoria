import React, { Component } from 'react';
import Post from './post.js'

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toPostText: "",
      postDemography: "Public",
      posts: [],
      postId: 0,
      filteredPosts: [],
      activeFilter: "Public"
    };
  }

  appendPost = (postText, id, postDemography) => {
    const posts = [...this.state.posts]
    posts.push({text: postText,
                id: id,
                postDemography: postDemography
              })

    if (this.state.activeFilter === "Public") {
      this.setState({posts})
      this.setState({
        filteredPosts: posts
      })
    } else {
      this.setState({posts}, () => this.activateFilter())
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.toPostText !== "") {
      var postId = this.state.postId
      const postDemography = this.state.postDemography
      this.appendPost(this.state.toPostText, postId, postDemography)
      postId = this.state.postId + 1
      this.setState({postId : postId})

    }
  };

  handleDelete = index => () => {
    var confirm = window.confirm("Are you sure you want to delete this wonderful post?");
    if (confirm) {
      var filteredPosts = [...this.state.filteredPosts]
      const id = filteredPosts[index]["id"]
      filteredPosts = filteredPosts.splice(index, 1)
      this.setState({filteredPosts})
      const posts = [...this.state.posts].filter(post => post["id"] !== id)
      this.setState({posts}, () => this.activateFilter())
    }
  }

  handleFilter = event => {
    const filter = event.currentTarget.value
    this.setState({
      activeFilter: filter
    }, () => this.activateFilter())
  }

  activateFilter = () => {
    if (this.state.posts !== [] && this.state.activeFilter !== "Public") {
      const filteredPosts = [...this.state.posts].filter(post => post["postDemography"] === this.state.activeFilter)
      this.setState({filteredPosts})
    } else if (this.state.posts !== []) {
      const allPosts = [...this.state.posts]
      this.setState({
        filteredPosts: allPosts
      })
    }
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea required name="toPostText" value={this.state.toPostText} onChange={this.handleInputChange} />
          <select name="postDemography" value={this.state.postDemography} onChange={this.handleInputChange}>
            <option value="Friends">Friends</option>
            <option value="Public">Public</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          <button type="button" value="Friends" onClick={this.handleFilter}>Friends</button>
          <button type="button" value="Public" onClick={this.handleFilter}>Public</button>
        {this.state.filteredPosts.map((post, index) => <Post key={post.id} text={post.text} id={post.id} onDelete={this.handleDelete(index)}/>)}
      </div>
    )
  }
}

export default Timeline;
