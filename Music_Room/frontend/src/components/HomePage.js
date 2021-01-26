import React, { Component} from 'react';
//import {render} from "react-dom";
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Redirect,
    Route
} from 'react-router-dom';


export default class HomePage extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><p>This is the home page</p></Route>
                    <Route path='/join' component={JoinRoomPage}/>
                    <Route path='/create' component={CreateRoomPage}/>
                </Switch>
            </Router>
            );
    }
}