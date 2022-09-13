> 1. Sử dụng prevState có hai cách

- Một là khai báo một biến riêng lưu lại

```sh
handleOpenActions () {
    let openContextMenu = this.state.openContextMenu // khai báo riêng
    this.setState({
      openContextMenu: !openContextMenu
    })
}
```
  
- Hai là dùng prevState

```sh
handleOpenActions () {
	this.setState((prevState) => ({ isOpenNoteAction: !prevState.isOpenNoteAction}))
}
```

> 2. TypeError: this.setState is not a function

- Nhớ `bind(this)` hàm trong constructor

> 3. Sử dụng map

- enables you to `iterate over your list of items to display them`
- convert one list of items to `another list of items`. Ex: convert a list of item to HTML elements.
- `add key attribute to list item`. Only that way React is able to identify added, changed and removed items when the list changes.
- You should make sure that `the key attribute is a stable identifier`. Don’t make the mistake of using the item index in the array. The array index isn’t stable at all.

```sh
// Do this
{list.map(function (item) {
    return (
		<div key={item.objectID}> // add key attribute to list item
		  <span>
			<a href={item.url}>{item.title}</a>
		  </span>
		  <span>{item.author}</span>
		  <span>{item.num_comments}</span>
		  <span>{item.points}</span>
		</div>
	)
})}

// Don't do this
{ list.map(function(item, key) {
	return (
		<div key={key}>
		...
		</div>
	);
})}
```

> 4. Sử dụng arrow function

```sh
// function expression
function () { ... }

// arrow function expression
() => { ... }

// You can remove the parenthesis when the function gets only one argument
// allowed
item => { ... }

// allowed
(item) => { ... }

// not allowed
item, key => { ... }

// allowed
(item, key) => { ... }

{list.map(function (item) {
	return (
		<div key={item.objectID}>
		...
	)}}
		
{list.map(item => {
	return (
		<div key={item.objectID}>
		...
	)}}
	
// Can remove block body and return statement. In a concise body an implicit
// return is attached thus you can remove the return statement

{list.map(item =>
		<div key={item.objectID}>
		...
	)}}
```

> 5. ES6 const and let

- A variable declared with 'const' cannot be re-assigned or re-declared. It cannot get mutated (changed, modifield)

```sh
const hello = 'ReactJS'
hello = 'bye bye' > Uncaught TypeError: Assignment to constant variable.
```

- A variable declared with let can get mutated.

```sh
let abc = 'React Native'
abc = 'Flutter' > Flutter
```

**Note**: When the variable is an array or object, `the value it holds can get altered`.

```sh
const example = {
    text: 'Welcome to React'
}

example.text > "Welcome to React"
example.text = 'Say hi'
example.text > "Say hi"
```

- In your application, you `should use const over var`.

> 6. ReactDOM

```sh
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
```

- ReactDOM.render() uses a DOM node in your HTML to replace it with your JSX (Javascript XML).
- ReactDOM.render() expects two arguments:
	- The first argument is JSX that gets rendered.
	- The second argument specifies the place where the React application hooks into your HTML.

- It expects an element with an id='root'. 

> 7. Key and variable share the same name

```sh
this.state = {
	list: list
}

this.state = {
	list
}
```

> 8. Bind(this)

```sh
// the function is bound to the class => becomes a class method
this.onDismiss = this.onDismiss.bind(this)
```

> 9. DESTRUCTING

- Object

```sh
const { searchTerm, list } = this.state
```

- Array

```sh
const users = ['Robin', 'Andrew', 'Dan'];
const [
	userOne,
	userTwo,
	userThree
] = users;

console.log(userOne, userTwo, userThree);

-> output: Robin Andrew Dan
```

- Spread operator

```sh
// before you would have to destructure the props before passing them
const { foo, bar } = props;
<SomeComponent foo={foo} bar={bar} />

// but you can use the object spread operator to pass all object properties
<SomeComponent { ...props } />
```

> 10. CONDITION

```sh
result ? <Table /> : null

result && <Table />
```

> 11. ES6 CLASSES

- Even though React embraces functional programming, for instance with immutable data structures, classes are used to declare components. They are called ES6 class components. 

```sh
class Developer {
	constructor(firstname, lastname) {
		this.firstname = firstname;
		this.lastname = lastname;
	}
	getName() {
		return this.firstname + ' ' + this.lastname;
	}
}
```

- A class has a constructor to make it instantiable. The constructor can take arguments to assign it to the class instance. Additionally a class can define functions. 
- Because the function is associated with a class, it is called a method.
- You can create multiple instances of the class by invoking it

> Extends 'Component':

```sh
import React, { Component } from 'react';
...
class App extends Component {
	render() {
	...
	}
}
```

- 'App' inherits functionalities from the Component class, extend a basic ES6 class to a ES6 component class.
- The methods a React Component exposes is the public interface. One of these methods has to be overwritten, the others don’t need to be overwritten.

> 12. INTERNAL COMPONENT STATE

- Internal component state allows you to store, modify and delete properties of your component.
- The ES6 class component can use a constructor to initialize internal component state. The constructor is `called only once when the component initializes`.

```sh
class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			list: list,
		};
	}
	...
}
```

- Note that you have to call `super(props);` to call the constructor of the extended Component class. `It’s mandatory`, because it sets `this.props` in your constructor.
- The state is bound to the class with the this object.
- Every time you change your component state, the render() method of your component `will run again`.

**NOTE:**  Don’t mutate the state directly. You have to use a method called `setState()` to modify your state.

> 13. ES6 OBJECT INITIALIZER

- You can initialize methods in an object

```sh
// ES6
const userService = {
	getUserName(user) {
		return user.firstname + ' ' + user.lastname;
	},
};
```

> 14. FILTER

- The filter function `takes a function to evaluate each item in the list`. If the evaluation for an item is true, the item stays in the list. Otherwise it will get removed.
- Additionally the function returns `a new list` and doesn’t mutate the old list.

Example:

```sh
var ages = [32, 33, 16, 40];

function checkAdult(age) {
  return age >= 18;
}

function myFunction() {
  document.getElementById("demo").innerHTML = ages.filter(checkAdult);
}

>>> 32,33,40
```

> 15. HIGH ORDER FUNCTION

- We have to pass the searchTerm to the filter function and have to return a new function to evaluate the condition. That’s called a higher order function

```sh
list.filter(isSearched(searchTerm))

function isSearched(searchTerm) {
	return function(item) {
		return !searchTerm || // You filter the list only when a searchTerm is set, else return all list
			item.title.toLowerCase().includes(searchTerm.toLowerCase());
	}
}
```

> 16. PROPS

- `The props` - short form for properties - have all the values you have passed to the components when you used them in your App component. You could reuse these components somewhere else but pass them different values. They are reusable.

- After all it is not only text that you can pass as children. You can pass an element and element trees (which can be encapsulated by components again) as children.

> 17. DEFAULT PARAMETER

```sh
class Button extends Component {
	render() {
		const {
			onClick,
			className = '',
			children,
		} = this.props;
		...
	}
}
```

Now, whenever there is no className property, the value will be an empty string.

> 18. COMPONENT DECLARATIONS

- Functional Stateless Components: 

	- Which get an input and return an output. The input is the props object. The output is a component instance.
	- Functional stateless components are functions (functional) and they have no internal state (stateless)
	- Additionally they have no lifecycle methods.

- ES6 Class Components:

	- They extend from the React component. The extend hooks all the lifecycle methods available in the React component API - to the component. 
	- You can store and manipulate state in ES6 class components

Ex:

```sh
function Search({ value, onChange, children }) {
	return (
		<form>
			{children} <input
				type="text"
				value={value}
				onChange={onChange}
			/>
		</form>
	);
}

const Search = ({ value, onChange, children }) =>
	<form>
	{children} <input
		type="text"
		value={value}
		onChange={onChange}
		/>
	</form>
```

> 19. LIFECYCLE METHODS

- These methods are a hokk into the lifecycle of a React component.

	- The mounting of a component has 4 lifecycle methods

		- constructor()
		- componentWillMount()
		- render()
		- componentDidMount()

	- The update lifecycle of a component when the state or the props change
	
		- componentWillReceiveProps()
		- shouldComponentUpdate()
		- componentWillUpdate()
		- render()
		- componentDidUpdate()

	- The unmounting lifecycle
	
		- componentWillUnmount()

> 20. SPECIFIC EACH LIFECYCLE METHODS ***

+ The mounting of a component

• constructor(props):  It is called when the component gets initialized. You can set an initial
component state and bind useful class methods during that lifecycle method.

• componentWillMount() - It is called before the render() lifecycle method. That’s why it
could be used to set internal component state, because it will not trigger a second rendering
of the component. Generally it is recommend to use the constructor() to set the initial state.

• render() - The lifecycle method is mandatory and returns the elements as an output of the
component. The method should be pure and therefore shouldn’t modify the component state.
It gets an input as props and state and returns an element.

• componentDidMount() - It is called only once when the component mounted. That’s the
perfect time to do an asynchronous request to fetch data from an API. The fetched data would
get stored in the internal component state to display it in the render() lifecycle method.

+ The update lifecycle of a component

• componentWillReceiveProps(nextProps) - The lifecycle method is called during an update
lifecycle. As input you get the next props. You can diff the next props with the previous props
(this.props) to apply a different behavior based on the diff. Additionally you can set state
based on the next props.

• shouldComponentUpdate(nextProps, nextState) - It is always called when the component
updates due to state or props changes. Depending on a boolean that you return from this lifecycle
method, the component and all its children will render or will not render on an update
lifecycle.

• componentWillUpdate(nextProps, nextState) - The lifecycle method is immediately invoked before the render() method. 
You already have the next props and next state at your disposal. You can use the method as last opportunity to perform 
preparations before the render method gets executed. 
*** NOTE THAT: you cannot trigger setState() anymore. If you want to
compute state based on the next props, you have to use componentWillReceiveProps().

• componentDidUpdate(prevProps, prevState) - The lifecycle method is immediately invoked
after the render() method. You can use it as opportunity to perform DOM operations or to
perform further asynchronous requests.

• componentWillUnmount() - It is called before you destroy your component. You can use the
lifecycle method to perform any clean up tasks.

> 21. TEMPLATE STRING

_ Use to concatenate strings
// ES6
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

> 22. FETCHING DATA

_ Use native 'fetch' function

this.state = {
	result: null,
	searchTerm: 'redux',
};

setSearchTopstories(result) {
	this.setState({ result });
}

fetchSearchTopstories(searchTerm) {
	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
	.then(response => response.json())
	.then(result => this.setSearchTopstories(result));
}

componentDidMount() {
	const { searchTerm } = this.state;
	this.fetchSearchTopstories(searchTerm);
}

1st. Use the componentDidMount() lifecycle method to fetch the data after the component
did mount.
2nd. The native fetch is used. The url is the argument for the native fetch API function. The response needs to get
transformed to json, that’s a mandatory step in a native fetch, and can finally be set in the internal component state.


> 23. OBJECT ASSIGN

_ React embraces functional programming. Thus you shouldn’t mutate an object (or mutate the state
directly). A better approach is to generate a new object based on information you have.
You will always return a new object and never alter an object.

+ ES5
_ Object.assign() takes as first argument a target object. All following arguments are source objects. 
These objects are merged into the target object. The target object can be an empty object. 

const updatedHits = { hits: updatedHits };
const updatedResult = Object.assign({}, this.state.result, updatedHits);

> 24. SPREAD OPERATOR IN ES6

_ Spread operator ->  It only consists of three dots: ... When it is used, every value
from an array or object gets copied to another array or object.

--- Variable
const userList = ['Robin', 'Andrew', 'Dan'];
const additionalUser = 'Jordan';
const allUsers = [ ...userList, additionalUser ];
console.log(allUsers);
// output: ['Robin', 'Andrew', 'Dan', 'Jordan']
-> The 'allUsers' variable is a completely new array. 

--- Array
const oldUsers = ['Robin', 'Andrew'];
const newUsers = ['Dan', 'Jordan'];
const allUsers = [ ...oldUsers, ...newUsers ];
console.log(allUsers);
// output: ['Robin', 'Andrew', 'Dan', 'Jordan']

--- Object -> It copies each key value pair into a new object.

Ex1:
const userNames = { firstname: 'Robin', lastname: 'Wieruch' };
const age = 28;
const user = { ...userNames, age };
console.log(user);
// output: { firstname: 'Robin', lastname: 'Wieruch', age: 28 }

Ex2:
const userNames = { firstname: 'Robin', lastname: 'Wieruch' };
const userAge = { age: 28 };
const user = { ...userNames, ...userAge };
console.log(user);
// output: { firstname: 'Robin', lastname: 'Wieruch', age: 28 }

> 25. SUPPRES THE NATIVE BROWSER BEHAVIOR

event.preventDefault(); // suppress the browser reloads

> 26. [SEARCHKEY] SYNTAX

_ [searchKey] syntax. It is an ES6 computed property name. It helps you to allocate
values dynamically in an object.

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

_ Get:
const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : []

_ setState:
this.setState({
    results: {
      ...results,
      [searchKey]: {hits: updateHits, page }  
    }
})  

> 27. HIGH ORDER COMPONENT - HOC

_ They take any input - most of the time a component, but also optional arguments - and return a component as output. 
_ They have multiple purposes like improved reusability of components, greater abstraction, composeability of components and
manipulations of props, state and view. 

function withFoo(Component) {
	return function(props) {
		return <Component { ...props } />;
	}
}

_ One neat convention is to prefix the naming of a HOC with 'with'
const withFoo = (Component) => (props) =>
	<Component { ...props } />
	
_ Condition rendering with HOC
const withLoading = (Component) => (props) =>
	props.isLoading ? <Loading /> : <Component { ...props } />
	
_ Use destructuring to takes other properties
const withLoading = (Component) => ({ isLoading, ...rest }) =>
	isLoading ? <Loading /> : <Component { ...rest } />
	
> 28. SORT LIST USING LODASH

_ Install: npm install --save lodash
_ import { sortBy } from 'lodash'

Ex:
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
}

> 29. ADD CLASSES

_ 1st:
const sortClass = ['button-inline'];

if (sortKey === activeSortKey) {
	sortClass.push('button-active');
}

<Button
	onClick={() => onSort(sortKey)}
	className={sortClass.join(' ')}
>...</>

_ 2nd: using 'classnames' library

import classNames from 'classnames'

const sortClass = classNames(
	'button-inline',
	{ 'button-active': sortKey === activeSortKey }
);

<Button
	onClick={() => onSort(sortKey)}
	className={sortClass}
>

> 30. SETSTATE()

_ You can pass an object to the function where you can update partially the internal state.

this.setState({ foo: bar });

_ In its second version, you can pass a function to update the state.

this.setState((prevState, props) => {
	...
});

+ It is when you update the state depending on the previous state or props. If you don’t use a function,
the internal state management can cause bugs.
+ Why? The React setState() method is asynchronous. React batches setState() calls and executes them eventually.
It can happen that the previous state or props changed in between when you would rely on it.
Ex:
const { fooCount } = this.state;
const { barCount } = this.props;
this.setState({ count: fooCount + barCount });
=> Imagine that fooCount and barCount, thus the state or the props, can change somewhere else in your components.

_ Solution: With the function approach, the function in setState() is a callback that operates on the state and
props at the time of executing the callback function. 
this.setState((prevState, props) => {
	const { fooCount } = prevState;
	const { barCount } = props;
	return { count: fooCount + barCount };
});

> 31. Bất kỳ method hay function nào được gọi trong hàm map(), filter() của một list thì đều được truyền item trong list đó.

+ filter()
list.filter(isSearched(searchTerm))

function isSearched(searchTerm) {
	return function(item) { // <---- each item is passed to isSearched()
		return !searchTerm ||
			item.title.toLowerCase().includes(searchTerm.toLowerCase());
	}
}

+ map()
{list.map(item => 
	  <div key={item.asset_id}>
		<span>{item.name}</span>
		<span>{item.type_is_crypto}</span>
		<span>{item.price_usd}</span>
		<span>
		  <button
			onClick={() => this.onDismiss(item.asset_id)}
		  >
			Dismiss
		  </button>
		</span>
	  </div>
)}

onDismiss(id) {
    function isAssetId(item) { //  <---- each item is passed to onDismiss()
      return item.asset_id !== id
    }
    const updateList = this.state.list.filter(isAssetId) // OR this.state.list.filter(item => item.asset_id !== id)
    this.setState({
      list: updateList
    })
}

> 30. SETSTATE() - Part 2 ***

_ Executing one of the class methods, onIncrement() or onDecrement(), multiple times could lead
to a bug. Because both methods depend on the previous state, it could use a stale (cũ) state when the
asynchronous update wasn’t executed in between and the method got invoked another time.

Ex:

onIncrement() {
	this.setState({
		counter: this.state.counter + 1
	});
}
onDecrement() {
	this.setState({
		counter: this.state.counter - 1
	});
}

this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
// updated state: { counter: 1 }
// instead of: { counter: 3 }

_ It becomes even more error prone when multiple functions, use this.setState() depend on the previous state.

_ Refactor
onIncrement() {
	this.setState(prevState => ({
		counter: prevState.counter + 1
	}));
}
onDecrement() {
	this.setState(prevState => ({
		counter: prevState.counter - 1
	}));
}

_ Two more benefits:
+ First, the function which is used in this.setState() is a pure function. There are no side-effects. The function always will return the same output (next state)
when given the same input (previous state).
+ Second, , since the function is pure, it can be tested easily in an unit test and independently from the component. It gives you the opportunity to test your local state updates
as business logic which is separated from the view layer. 

const incrementUpdate = prevState => ({
	counter: prevState.counter + 1
});

const decrementUpdate = prevState => ({
	counter: prevState.counter - 1
});

onIncrement() {
	this.setState(incrementUpdate);
}
onDecrement() {
	this.setState(decrementUpdate);
}
