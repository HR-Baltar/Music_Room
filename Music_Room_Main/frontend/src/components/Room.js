import React, { Component} from 'react';

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
    }

    getRoomDetails(){
        fetch("/api/get-room" + "?code=" + this.roomCode)
        .then((response) => response.json())
        .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_pausible,
                    isHost: data.is_host,
                });
            });
    }

    render(){
        return(
            <div>
                <h4>{this.roomCode}</h4>
                <p>Votes To Skip: {this.state.votesToSkip}</p>
                <p>Allow Guest Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}

//import Room from './Room';