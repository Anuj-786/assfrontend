import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null};
    }

    logout = () => {
        this.setState({isAuthenticated: false})
    };
    componentDidMount() {
      this.fetchData();
    }
    fetchData = () => {
      fetch('http://localhost:4001/users')
      .then( (res) => res.json())
      .then( (data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    googleResponse = (res) => {
      console.log(res)
      // this.setState({isAuthenticated: true, user: res.w3.U3})
    };
    
    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
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
