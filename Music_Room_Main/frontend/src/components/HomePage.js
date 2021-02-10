import React, { Component} from 'react';
//import {render} from "react-dom";
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import TestPage from './Test';
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Redirect,
    Route
} from 'react-router-dom';
//import Room from './Room';


export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount(){
        //without async we have to wait for this /function/ to finsih

        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                });
            });
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align = "center">
                    <Typography variant = "h3" compact = "h3">HouseParty</Typography>
                    </Grid>
                <Grid item xs={12} align = "center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to='/create' component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,
        })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => {
                        return this.state.roomCode ? (
                            <Redirect to= {`/room/${this.state.roomCode}`}/>): (this.renderHomePage());
                        }}/>
                        
                    <Route path='/join' component={JoinRoomPage}/>
                    <Route path='/create' component={CreateRoomPage}/>
                    <Route path="/room/:roomCode" render={(props) => {
                        return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                    }} /> 
                    <Route path = '/test' component = {TestPage}/>
                </Switch>
            </Router>
            );
    }
}