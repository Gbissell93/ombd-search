import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieDetail from "./Components/movieDetail/MovieDetail";
import Movies from "./Components/movie/Movies";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/movie-detail/:imdbID" component={MovieDetail} />
            <Route exact path="/" component={Movies} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
