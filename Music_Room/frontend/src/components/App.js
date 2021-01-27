import React, { Component} from 'react';
import {render} from 'react-dom';
import HomePage from './HomePage';


export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return( 
            //returns the Homepage component
            <div>
                <HomePage />

            </div>);
    }
}

//research this later ///
const appDiv = document.getElementById("app");
render(<App name = "Henyers"/>, appDiv);