import React, { Component } from 'react';
import axios from 'axios';


export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    
    const id = this.props.match.params.movieId;

    console.log(this.props.match.params.movieId)
    // console.log(id)
    //  const movie = this.state.movie.find(movie=> (`${movie.id}` === id))
    this.fetchMovie(id);
    // this.setState({movie: })
  
  }

  fetchMovie = id  => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = (movie) => {
    
    
   const addToSavedList = this.props.addToSavedList;
  
      addToSavedList(movie);
  
  }
  

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const { title, director, metascore, stars} = this.state.movie;
    
    return (

      // <MovieCard movies={this.state.movie}/>
      <div>
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div star={star} key={star} className="movie-star">
              {star}
            </div>
          ))}
          
        </div>
        <div onClick={()=>this.saveMovie(this.state.movie)} className="save-button">Save</div>
        </div>
      </div>

    );
  }
}
