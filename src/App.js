import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { sortBy } from 'lodash'
import classNames from 'classnames'

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

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
}

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
const DEFAULT_HPP = '10'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    }

    this.needToSearchTopstories = this.needToSearchTopstories.bind(this)
    this.onDismiss = this.onDismiss.bind(this) // the function is bound to the class => becomes a class method
    this.onSearchChange = this.onSearchChange.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  needToSearchTopstories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  setSearchTopStories(result) {
    const { hits, page } = result

    this.setState(prevState => {
      const { searchKey, results } = prevState

      // check if there are already old hits from 'results' with 'searchKey' as key
      const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : []
  
      const updateHits = [ // merge old and new data
        ...oldHits,
        ...hits
      ]
  
      return {
        results: {
          ...results,
          [searchKey]: {hits: updateHits, page }  
        },
        isLoading: false
      }
    })
  }

  fetchSearchTopStories(searchTerm, page) {
    this.setState({ isLoading: true })

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`) // https://hn.algolia.com/api/v1/search?query='redux&page=0&hitsPerPage=100'
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onDismiss(id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]

    const isNotId = item => item.objectID !== id
    const updateHist = hits.filter(isNotId)
    
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updateHist, page }
      }
    })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })

    if (this.needToSearchTopstories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    }
    event.preventDefault() // prevent browser reloads
  }

  render() {
    const { searchTerm, results, searchKey, isLoading } = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []

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
        <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        <div className='interactions'>
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const Loading = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  )
}

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading ? <Loading/> : <Component {...rest} />

const ButtonWithLoading = withLoading(Button)

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

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  )

  return (
    <Button 
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  )
  // <button class="button-inline button-active" type="button">Author</button>
}

class Table extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    }

    this.onSort = this.onSort.bind(this)
  }

  onSort(sortKey) {
    // It is when sortKey in the state is the same as the incoming sortKey
    // and the reverse state is not already set to true
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState({ sortKey, isSortReverse })
  }

  render() {
    const { list, onDismiss } = this.props
    const { sortKey, isSortReverse } = this.state

    const sortedList = SORTS[sortKey](list)
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: '40%' }}>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={{ width: '30%' }}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            Archive
          </span>
        </div>
        
        { reverseSortedList.map(item =>
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
    )
  }
}

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

/* Client cache

results: {
  redux: {
    hits: [ ... ],
    page: 2,
  },
  react: {
    hits: [ ... ],
    page: 1,
  },
  ...
}
*/