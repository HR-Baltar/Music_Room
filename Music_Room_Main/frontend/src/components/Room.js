import React, { Component} from 'react';
import {Grid, Button, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';

export default class Room extends Component {
    constructor(props){
        super(props);
        this.state= {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    }

    getRoomDetails(){
        fetch("/api/get-room" + "?code=" + this.roomCode)
        .then((response) => {
            if (!response.ok){
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            
            response.json()})
        .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_pausible,
                    isHost: data.is_host,
                });
            });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
        }
        fetch("/api/leave-room", requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
        });
    }

    render(){
        return( <Grid container spacing={1}>
            <Grid item xs={12} align = "center">
                <Typography variant="h4" component="h4">
                    Code: {this.roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <Typography variant="h4" component="h4">
                    Votes: {this.state.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <Typography variant="h4" component="h4">
                    Guest Can Pause: {this.state.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <Typography variant="h4" component="h4">
                    Host: {this.state.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <Button variant = "contained" color = "secondary" onClick={this.leaveButtonPressed}>
                    Back To Home
                </Button>
            </Grid>
        </Grid>
        );
    }
}

//import Room from './Room';

{/* <div>
<h4>{this.roomCode}</h4>
<p>Votes To Skip: {this.state.votesToSkip}</p>
<p>Allow Guest Pause: {this.state.guestCanPause.toString()}</p>
<p>Host: {this.state.isHost.toString()}</p>
</div> */}