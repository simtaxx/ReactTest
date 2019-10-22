import React from 'react';
import Card from './Card';

class filmsCard extends React.Component {
    state = {
      data: {},
      url: 'https://image.tmdb.org/t/p/w300/',
      currentPage: 1
      
  }
  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=05b735a5f79822f887889281f45b295a&language=en-US&page=${this.state.currentPage}`)
    .then((res) => {
      return res.json()
    })
    .then((result) => {
        this.setState({data: result.results})
        console.log(this.state.data)
      }
    )
  }
  delete = (e) => {
    this.setState({data: this.state.data.filter((data, index) => index !== e)})
  }
  nextPage = () => {
    this.setState((state) => {
      return {currentPage: state.currentPage + 1}
    }, () => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=05b735a5f79822f887889281f45b295a&language=en-US&page=${this.state.currentPage}`)
      .then((res) => {
        console.log('lourd')
        return res.json()
      })
      .then((result) => {
          this.setState({data: result.results})
        }
      )
    })
    console.log(this.state.currentPage)
  }
  previousPage = () => {
    if (this.state.currentPage <= 1) {
      return this.setState({currentPage: 1})
    }
    this.setState((state) => {
      return {currentPage: state.currentPage - 1}
    }, () => {
      console.log("lourd")
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=05b735a5f79822f887889281f45b295a&language=en-US&page=${this.state.currentPage}`)
      .then((res) => {
        return res.json()
      })
      .then((result) => {
          this.setState({data: result.results})
        }
      )
    })
    console.log(this.state.currentPage)
  }
  render() {
    const datas = this.state.data
    if (this.state.data.length) {
      return(
        <div className="filmsCard">
          {datas.map((data, index) => {
            return <Card delete={this.delete} index={index} data={data} url={this.state.url} key={index} />
          })}
          <div className="pagination">
            <button onClick={() => {this.previousPage()}}>Page précédente</button>
            <button onClick={() => {this.nextPage()}}>Page suivante</button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default filmsCard