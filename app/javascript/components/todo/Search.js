import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTodos: props.currentTodos,
      query: "",
      loading: false,
      message: "",
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
  }
  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, results: {}, message: "" });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(query);
      });
    }
  };
  /**
   * Fetch the search results and update the state with the result.
   *
   * @param {int} updatedPageNo Updated Page No.
   * @param {String} query Search Query.
   *
   */
  fetchSearchResults = (query) => {};
  renderSearchResults = () => {
    const { results } = this.state;
    console.log(this.state);
  };

  render() {
    const { query, message, loading } = this.state;
    return (
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <BsSearch />
        </label>
        {message && <p className="message">{message}</p>}
        {loading ? <Spinner animation="border" /> : null}
        <input
          value={query}
          id="search-input"
          placeholder="Search..."
          onChange={this.handleOnInputChange}
        />
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
