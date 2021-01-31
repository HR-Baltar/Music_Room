import React, { Component} from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { link } from "react-router-dom";
//import {render} from "react-dom";

export default class JoinRoomPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomCode: "",
            error: "",
        }
    }
    render() {
        return ( //<p> this is a modified join room</p>

            <Grid container Spacing = {1} align = "center">
                <Grid item xs = {12}>
                    <Typography variant = "h4"  component = "h4">
                        Join A Room Today!
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                    <TextField
                        error = {this.state.error}
                        label = "Code"
                        placeholder = "Enter a Room Code"
                        value={ this.state.roomCode}
                        helperText = {this.state.error}
                        variant = "outlined"
                    />
                </Grid>
            </Grid>
        );
    }
}