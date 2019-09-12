import React, { Component } from 'react';
import './App.css';

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
  return function(item) { // You filter the list only when a searchTerm is set 
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
} */

const isSearched = searchTerm => item =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list,
      searchTerm: ''
    }

    this.onDismiss = this.onDismiss.bind(this) // the function is bound to the class => becomes a class method
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onDismiss(id) {
    const updateList = this.state.list.filter(item => item.objectID !== id)
    this.setState({ list: updateList})
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <form>
          <input
            type="text"
            onChange={this.onSearchChange}
          />
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
