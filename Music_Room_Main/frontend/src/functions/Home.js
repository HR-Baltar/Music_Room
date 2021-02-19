import React, { useState} from 'react';
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
//import {Link} from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Redirect,
    Route
} from 'react-router-dom';
import HostRoom from "./HostRoom";
import JoinRoom from "./JoinRoom";
import Info from "./Info";

export default function Home(props){

    function renderHome(){
        return (
            <Grid container spacing = {3}>
                <Grid container spacing={1}>
                    <Grid item xs= {12}>
                        <h3>Welcome to</h3>
                        <h1>Music Room</h1>
                    </Grid>
                </Grid>
                <Grid container direction="column">
                    <Button to="/join" component={Link}>
                        Join
                    </Button>
                    <Button to="/create" component={Link}>
                        Host
                    </Button>
                    <Button to="/info" component={Link}>
                        Help
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return(
        <Router>
            <Switch>
                <Route exact path='/' render={()=>{
                    return renderHome();
                }}/>
                <Route path="/create" component={HostRoom}/>
                <Route path="/join" component={JoinRoom}/>
                <Route path="/info" component={Info}/>
            </Switch>
        </Router>
    );
}