import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=3618891b";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    return movies
      ? movies.filter((movie) => movie.Title.toLowerCase().includes(inputValue))
      : [];
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search for movies",
    value: searchTerm,
    onChange: (e, { newValue }) => setSearchTerm(newValue),
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.Title}</div>;

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.Title}
          renderSuggestion={renderSuggestion}
          inputProps={{
            ...inputProps,
            className: "autosuggest-container",
          }}
          theme={{
            suggestionsContainer: "suggestionsContainer", 
            suggestionsList: "suggestionsList", 
            suggestion: "suggestion", 
          }}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
