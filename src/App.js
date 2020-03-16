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
function isSearched(searchTerm) {
  return function(item) { // You filter the list only when a searchTerm is set, else return all list
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

/* const isSearched = searchTerm => item =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) */

const DEFAULT_QUERY = 'redux'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = '100'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

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
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  setSearchTopStories(result) {
    const { hits, page } = result

    // check if there are already old hits
    const oldHits = page !== 0 // page = 0 -> it is a new search request, hits are empty. When click 'More' button, page != 0 -> save current hits to oldHits
      ? this.state.result.hits
      : []

    const updateHits = [ // merge old and new data
      ...oldHits,
      ...hits
    ]

    this.setState({
      result: { hits: updateHits, page }
    })
  }

  fetchSearchTopStories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`) // https://hn.algolia.com/api/v1/search?query='redux&page=0&hitsPerPage=100'
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onDismiss(id) {
    const updateList = this.state.result.hits.filter(item => item.objectID !== id)
    this.setState({ 
      result: { ...this.state.result, hits: updateList }
    })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    event.preventDefault() // prevent browser reloads
  }

  render() {
    const { searchTerm, result } = this.state
    const page = (result && result.page) || 0

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
        </Search>
        </div>
        { result &&
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
        <div className='interactions'>
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, children , onSubmit }) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
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

/* 
{
  "result": {
    "hits": [
      {
        "created_at": "2009-03-23T17:15:01.000Z",
        "title": "Failure is overrated, a redux",
        "url": "http://www.37signals.com/svn/posts/1643-failure-is-overrated-a-redux",
        "author": "johns",
        "points": 29,
        "story_text": "",
        "comment_text": null,
        "num_comments": 13,
        "story_id": null,
        "story_title": null,
        "story_url": null,
        "parent_id": null,
        "created_at_i": 1237828501,
        "relevancy_score": 1719,
        "_tags": "[\"story\", \"author_johns\", \"story_528842\"]",
        "objectID": "528842",
        "_highlightResult": "{author: {…}, story_text: {…}, title: {…}, url: {…}}"
      },
      {
        "created_at": "2018-08-28T15:52:11.000Z",
        "title": "Show HN: Nion, declarative API data management library built on Redux",
        "url": "https://github.com/Patreon/nion",
        "author": "meagher",
        "points": 28,
        "story_text": null,
        "comment_text": null,
        "num_comments": 4,
        "story_id": null,
        "story_title": null,
        "story_url": null,
        "parent_id": null,
        "created_at_i": 1535471531,
        "relevancy_score": 8332,
        "_tags": "[\"story\", \"author_meagher\", \"story_17859749\", \"show…]",
        "objectID": "17859749",
        "_highlightResult": "{author: {…}, title: {…}, url: {…}}"
      },
      {
        "created_at": "2016-06-07T15:44:20.000Z",
        "title": "Cabin: Thoroughly Learn React and Redux with This Example App",
        "url": "http://cabin.getstream.io/",
        "author": "tortilla",
        "points": 28,
        "story_text": null,
        "comment_text": null,
        "num_comments": 2,
        "story_id": null,
        "story_title": null,
        "story_url": null,
        "parent_id": null,
        "created_at_i": 1465314260,
        "relevancy_score": 6773,
        "_tags": "[\"story\", \"author_tortilla\", \"story_11855243\"]",
        "objectID": "11855243",
        "_highlightResult": "{author: {…}, title: {…}, url: {…}}"
      }
    ],
    "nbHits": 12794,
    "page": 5,
    "nbPages": 50,
    "hitsPerPage": 20,
    "exhaustiveNbHits": false,
    "query": "redux",
    "params": "advancedSyntax=true&analytics=true&analyticsTags=backend&page=4&query=redux",
    "processingTimeMS": 2
  },
  "searchTerm": "redux"
}
 */