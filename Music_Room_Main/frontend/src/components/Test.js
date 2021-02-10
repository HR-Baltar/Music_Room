import React, { Component} from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { link } from "react-router-dom";
//import {render} from "react-dom";

export default class TestPage extends Component {
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
                        Testing..........
                    </Typography>
                </Grid>

            </Grid>
        );
    }
}
