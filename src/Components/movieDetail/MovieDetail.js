import React, { Component } from "react";
import axios from "axios";
import "./MovieDetails.css";

export class movieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: "",
      Actors: "",
      Poster: "",
      Rated: "",
      Year: "",
      Genre: "",
      Rating: "",
      Plot: "",
    };
  }

  componentDidMount() {
    this.fetchMovieDetails(this.props.match.params.imdbID);
  }
  fetchMovieDetails = async (id) => {
    try {
      let movie = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=96779e86`
      );
      this.setState({
        Title: movie.data.Title,
        Actors: movie.data.Actors,
        Poster: movie.data.Poster,
        Rated: movie.data.Rated,
        Year: movie.data.Year,
        Genre: movie.data.Genre,
        Rating: movie.data.imdbRating,
        Plot: movie.data.Plot,
      });

      console.log("movie", movie, "state", this.state);
    } catch (e) {}
  };

  render() {
    return (
      <div className="container">
        <div className="movie-details-container">
          <h2 className="title">{this.state.Title}</h2>

          <div className="poster">
            <img
              src={`${this.state.Poster}`}
              alt={`${this.state.Title} poster`}
            />
          </div>
          <div className="movie-detail-list">
            <ul>
              <li>Rated: {this.state.Rated}</li>
              <li>Genre: {this.state.Genre}</li>
              <li>Year: {this.state.Year}</li>
              <li>Actors: {this.state.Actors}</li>
              <li>Rating: {this.state.Rating}</li>
            </ul>
          </div>

          <div className="plot">{this.state.Plot}</div>
        </div>
      </div>
    );
  }
}

export default movieDetail;
