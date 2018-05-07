import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isAuthenticated: true,
          user: '',
          userId: '',
          bookmarks: [],
          bookmark: '',
        };
    }

    logout = () => {
        this.setState({isAuthenticated: false})
        // var apiKey = '860174696391-8g8slc7sge6rj2jn08e2gpi9q1gafsjb.apps.googleusercontent.com'
    };
    componentDidMount() {
      this._fetchBookmarks();
      this._addUser()
    }

    _fetchBookmarks = () => {
      fetch('http://localhost:4001/getbookmarks')
      .then( (res) => res.json())
      .then( (data) => {
        this.setState({bookmarks: data.response})
      })
      .catch((error) => {
        console.log(error)
      })
    }
    _addUser = () => {
      fetch('https://backendassignement.herokuapp.com/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: 'anuj.k',
          user_id: 'test'
        })
      })
      .then( (res) => res.json())
      .then( (data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
    }


    googleResponse = (res) => {
      // console.log(res)
      // this.setState({isAuthenticated: true, user: res.w3.U3})
      this.setState({user: res.WE.w3.U3, userId: res.WE.googleId});
    };
    _handleInput = (event) => {
      // console.log(event.target.value);
      this.setState({bookmark: event.target.value })
    }
    _handleSubmit = (event) => {
      console.log(this.state.bookmark)
      fetch('https://backendassignement.herokuapp.com/savebookmark', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          url: 'testurl',
          user_id: 87
        })
      })
      .then( (res) => res.json())
      .then( (data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
       event.preventDefault();
    }

    render() {
        var bookmarksData =  this.state.bookmarks.map((bookmarks) => {
          return <li key = {bookmarks.id}>{bookmarks.email} </li>
        });
        // console.log(this.state.bookmarks)
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>user name</p>
                    <div>
                        {this.state.user}
                        {this.state.userId}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                        <form onSubmit={this._handleSubmit}>
                          <label>
                            Name:
                            <input type="text" name="name" onChange={this._handleInput}/>
                          </label>
                          <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <ul className = "bookmarks-list">
                      {bookmarksData}
                    </ul>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId="710684129426-nibabvr7nni97urcebfr0nn97crtdeg4.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;
