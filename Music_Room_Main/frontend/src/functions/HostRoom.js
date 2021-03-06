import React, { Component} from 'react';
//import {render} from "react-dom";
import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link} from "react-router-dom";

export default function HostRoom(props){
    return(
        <Grid container>
            <h1>Host A ROOM</h1>
            <Grid item xs = {1}>
                <Button to="/" component={Link}>
                    back
                </Button>
            </Grid>
        </Grid>
        

    );
}