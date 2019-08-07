import React, { Component } from 'react';

class Post extends Component {
  constructor(props) {
    super(props);
    const text = this.props.text
    this.state = {
      text: text,
      editEnabled: false
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleEnableEdit = () => {
    this.setState({
      editEnabled: true
    })
  }

  handleSave = () => {
    this.setState({
      editEnabled: false
    })
  }

  render() {
    return(
      <div id={this.props.id}>
        <textarea required disabled={!this.state.editEnabled} id={this.props.id} name="text" value={this.state.text} onChange={this.handleInputChange} />
        {this.state.editEnabled ?
        <button type="button" onClick={this.handleSave}>Save</button> :
        <div>
          <button type="button" onClick={this.handleEnableEdit}>Edit</button>
          <button type="button" onClick={this.props.onDelete}>Delete</button>
        </div>
        }
      </div>
    )
  }
}

export default Post;
