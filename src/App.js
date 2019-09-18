import React, { Component } from 'react';
import './App.css';
import Button from './Button';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

// The function takes the searchTerm and returns another function which takes an item
/* function isSearched(searchTerm) {
  return function(item) { // You filter the list only when a searchTerm is set, else return all list
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
} */

const isSearched = searchTerm => item =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())

const DEFAULT_QUERY = 'redux'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    this.onDismiss = this.onDismiss.bind(this) // the function is bound to the class => becomes a class method
    this.onSearchChange = this.onSearchChange.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
  }

  setSearchTopStories(result) {
    this.setState({ result })
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`) // https://hn.algolia.com/api/v1/search?query='redux'
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
  }

  onDismiss(id) {
    const updateList = this.state.list.filter(item => item.objectID !== id)
    this.setState({ list: updateList })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, result } = this.state

    if (!result) return null; // first time, result is empty. Prevent to display output.

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
        </Search>
        </div>
        <Table
          list={result.hits}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({ list, searchTerm, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(searchTerm)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

export default App;
