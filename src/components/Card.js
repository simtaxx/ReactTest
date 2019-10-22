import React from 'react';
import Like from '../assets/images/like.png'
import Dislike from '../assets/images/dislike.png'
import Delete from '../assets/images/delete.png'

class Card extends React.Component {
  state = {
    isLiked: false,
    isDisliked: false,
    like: 0,
    dislike: 0,
  }
  voteLike = () => {
    if (!this.state.isLiked) {
      if (!this.state.isDisliked) {
        this.setState({like: this.state.like + 1}, () => {
          this.setState({isLiked: true})
        })
      } else {
        this.setState({dislike: this.state.dislike - 1}, () => {
          this.setState({isDisliked: false})
        })
      }
      this.setState({like: this.state.like + 1}, () => {
        this.setState({isLiked: true})
      })
    } else {
      this.setState({like: this.state.like - 1}, () => {
        this.setState({isLiked: false})
      })
    }
  }
  voteDislike = () => {
    if (!this.state.isDisliked) {
      if (!this.state.isLiked) {
        this.setState({dislike: this.state.dislike + 1}, () => {
          this.setState({isDisliked: true})
        })
      } else {
        this.setState({like: this.state.like - 1}, () => {
          this.setState({isLiked: false})
        })
      }
      this.setState({dislike: this.state.dislike + 1}, () => {
        this.setState({isDisliked: true})
      })
    } else {
      this.setState({dislike: this.state.dislike - 1}, () => {
        this.setState({isDisliked: false})
      })
    }
  }
  render() {
      return <div className="card" key>
                <img src={this.props.url + this.props.data.backdrop_path} alt={this.props.data.title}/>
                <h3>{this.props.data.title}</h3>
                <p>Like(s): {this.state.like}</p>
                <p>Dislike(s): {this.state.dislike}</p>
                <img onClick={() => this.voteLike()} src={Like} alt="like" />
                <img onClick={() => this.voteDislike()} src={Dislike} alt="dislike" />
                <img onClick={() => {this.props.delete(this.props.index)}} src={Delete} alt="delete" />
              </div>
  }
}

export default Card