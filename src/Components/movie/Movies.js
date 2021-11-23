import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Movies.css";

export class Movies extends Component {
  state = {
    Title: "",
    Poster: "",
    search: "",
    isLoading: false,
    isError: false,
    errorMessage: "",
    searchArray: [],
    initialSearchArray: [
      "Superman",
      "lord of the ring",
      "batman",
      "Pokemon",
      "Harry Potter",
      "Star Wars",
      "avengers",
      "Terminator",
    ],
  };

  async componentDidMount() {
    const randomFranchise = Math.floor(
      Math.random() * this.state.initialSearchArray.length
    );
    this.fetchMovieApi(this.state.initialSearchArray[randomFranchise]);
  }

  fetchMovieApi = async (search) => {
    this.setState({
      isLoading: true,
    });

    if (search === "") {
      this.setState({
        isLoading: false,
        isError: true,
        errorMessage: "Search field cannot be empty",
      });
    } else {
      try {
        let idArray = await axios
          .get(`http://www.omdbapi.com/?s=${search}&apikey=96779e86`)
          .then((response) => response.data.Search.map((item) => item.imdbID))
          .catch((error) => {
            console.log(error);
            this.setState({
              isLoading: false,
              isError: true,
              errorMessage: error,
            });
          });

        console.log(idArray);
        let promise = idArray.map(async (item) => {
          return await axios.get(
            `http://www.omdbapi.com/?i=${item}&apikey=96779e86`
          );
        });

        Promise.all(promise)
          .then((result) => {
            let promisedArray = result.map((item) => item.data);
            console.log(promisedArray);
            this.setState({
              searchArray: promisedArray,
              isLoading: false,
            });
            console.log("search array", this.state.searchArray);
          })
          .catch((e) => {
            this.setState({
              isLoading: false,
              isError: true,
              errorMessage: e.response,
            });

            console.log(this.state.errorMessage);
          });
      } catch (e) {
        console.log(e.reponse);

        if (e && e.reponse === 404) {
          this.setState({
            isLoading: false,
            isError: true,
            errorMessage: e.response.data,
          });
        }

        if (this.state.searchArray.length === 0) {
          this.setState({
            isLoading: false,
            isError: true,
            errorMessage: e.response.data,
          });
        }
      }
    }
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnClick = async () => {
    this.fetchMovieApi(this.state.search);
  };
  render() {
    return (
      <div>
        <div className="search-bar">
          <input type="text" name="search" onChange={this.handleOnChange} />
          <button onClick={this.handleOnClick}>Search</button>
          {this.state.isError ? (
            <span style={{ color: "red" }}>{this.state.errorMessage}</span>
          ) : null}
        </div>
        <div className="results-container">
          {this.state.isLoading ? (
            <div>...loading</div>
          ) : (
            this.state.searchArray.map((item, index) => {
              return (
                <figure
                  name={`${item.name}`}
                  key={`${index}`}
                  className="results-cell"
                >
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/movie-detail/${item.imdbID}`}
                  >
                    <img src={item.Poster} alt={`${item.Title} Poster`}></img>
                    <figcaption>
                      {item.Title}
                      <p>
                        rating:<b> {item.imdbRating}</b>
                      </p>
                    </figcaption>
                  </Link>
                </figure>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default Movies;

//figure out Search bar and Error message before class and submit
